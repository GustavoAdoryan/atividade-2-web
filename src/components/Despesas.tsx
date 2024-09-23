import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import '../styles/Despesas.css';

const Despesas: React.FC = () => {
    const { addExpense } = useData();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount.toString()); // Garantindo que seja um número decimal

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('O valor da despesa deve ser um número válido maior que zero.');
            return;
        }

        try {
            await addExpense({ description, amount: parsedAmount });
            setDescription('');
            setAmount(0);
            alert('Despesa adicionada com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao adicionar despesa. Tente novamente.');
        }
    };

    return (
        <div className="despesas-container">
            <h3 className="despesas-title">Adicionar Despesa</h3>
            <form className="despesas-form" onSubmit={handleSubmit}>
                <input
                    className="despesas-input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"
                    required
                />
                <input
                    className="despesas-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Valor"
                    required
                />
                <button className="despesas-button" type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default Despesas;