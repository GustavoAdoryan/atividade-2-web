import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useData } from '../context/DataContext.tsx';
import '../styles/Dashboard.css';

// Registrando os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = React.memo(() => {
    const { incomes, expenses, removeIncome, removeExpense, addIncome, addExpense } = useData();

    const [editingIncome, setEditingIncome] = useState<any>(null);
    const [editingExpense, setEditingExpense] = useState<any>(null);

    const handleDeleteIncome = async (id: string) => {
        await removeIncome(id);
    };

    const handleDeleteExpense = async (id: string) => {
        await removeExpense(id);
    };

    const handleEditIncome = (income: any) => {
        setEditingIncome(income);
    };

    const handleEditExpense = (expense: any) => {
        setEditingExpense(expense);
    };

    const handleUpdateIncome = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingIncome) {
            try {
                await addIncome({
                    description: editingIncome.description,
                    amount: editingIncome.amount,
                });
                alert('Receita atualizada com sucesso!');
                setEditingIncome(null);
            } catch (error) {
                console.error('Erro ao atualizar receita: ', error);
                alert('Erro ao atualizar receita.');
            }
        }
    };

    const handleUpdateExpense = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingExpense) {
            try {
                await addExpense({
                    description: editingExpense.description,
                    amount: editingExpense.amount,
                });
                alert('Despesa atualizada com sucesso!');
                setEditingExpense(null);
            } catch (error) {
                console.error('Erro ao atualizar despesa: ', error);
                alert('Erro ao atualizar despesa.');
            }
        }
    };

    const totalIncome = incomes.length > 0
        ? incomes.reduce((sum, income) => sum + (income.amount || 0), 0)
        : 0;

    const totalExpense = expenses.length > 0
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

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Dashboard</h2>
            <div className="chart-container">
                <Bar data={data} />
            </div>
            <p>Total de Receitas: {totalIncome}</p>
            <p>Total de Despesas: {totalExpense}</p>
            <p>Saldo Restante: {balance}</p>

            <h3>Receitas</h3>
            {incomes.map((income) => (
                <div key={income.id}>
                    <p>{income.description} - R$ {income.amount}</p>
                    <button onClick={() => handleEditIncome(income)}>Editar</button>
                    <button onClick={() => handleDeleteIncome(income.id)}>Excluir</button>
                </div>
            ))}

            {editingIncome && (
                <form onSubmit={handleUpdateIncome}>
                    <input
                        type="text"
                        value={editingIncome.description}
                        onChange={(e) => setEditingIncome({ ...editingIncome, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingIncome.amount}
                        onChange={(e) => setEditingIncome({ ...editingIncome, amount: Number(e.target.value) })}
                    />
                    <button type="submit">Salvar Receita</button>
                </form>
            )}

            <h3>Despesas</h3>
            {expenses.map((expense) => (
                <div key={expense.id}>
                    <p>{expense.description} - R$ {expense.amount}</p>
                    <button onClick={() => handleEditExpense(expense)}>Editar</button>
                    <button onClick={() => handleDeleteExpense(expense.id)}>Excluir</button>
                </div>
            ))}

            {editingExpense && (
                <form onSubmit={handleUpdateExpense}>
                    <input
                        type="text"
                        value={editingExpense.description}
                        onChange={(e) => setEditingExpense({ ...editingExpense, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingExpense.amount}
                        onChange={(e) => setEditingExpense({ ...editingExpense, amount: Number(e.target.value) })}
                    />
                    <button type="submit">Salvar Despesa</button>
                </form>
            )}
        </div>
    );
});

export default Dashboard;
