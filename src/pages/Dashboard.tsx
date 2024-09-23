import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useData } from '../context/DataContext.tsx';
import '../styles/Dashboard.css';

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const Dashboard: React.FC = () => {
    const { incomes, expenses } = useData();

    const totalIncome = Array.isArray(incomes)
        ? incomes.reduce((sum, income) => sum + (income.amount || 0), 0)
        : 0;

    const totalExpense = Array.isArray(expenses)
        ? expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0)
        : 0;

    const balance = totalIncome - totalExpense;

    const data = {
        labels: ['Receitas', 'Despesas', 'Saldo'],
        datasets: [
            {
                label: 'Valores em R$',
                data: [totalIncome, totalExpense, balance],
                backgroundColor: ['#28a745', '#dc3545', '#007bff'],
            },
        ],
    };

    if (!incomes.length && !expenses.length) {
        return <p>Carregando dados...</p>;  // Indicador de carregamento
    }

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="chart-container">
                <Bar data={data} />
            </div>
            <p>Total de Receitas: {formatCurrency(totalIncome)}</p>
            <p>Total de Despesas: {formatCurrency(totalExpense)}</p>
            <p>Saldo Restante: {formatCurrency(balance)}</p>
        </div>
    );
};

export default Dashboard;
