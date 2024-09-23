import React, { useState } from 'react';
import { useData } from '../context/DataContext.tsx';
import '../styles/Receitas.css';

const Receitas: React.FC = () => {
    const { addIncome } = useData();
    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount.toString()); // Garantindo que seja um número decimal

        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            alert('O valor da receita deve ser um número válido maior que zero.');
            return;
        }

        try {
            await addIncome({ description, amount: parsedAmount });
            setDescription('');
            setAmount(0);
            alert('Receita adicionada com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao adicionar receita. Tente novamente.');
        }
    };

    return (
        <div className="receitas-container">
            <h3 className="receitas-title">Adicionar Receita</h3>
            <form className="receitas-form" onSubmit={handleSubmit}>
                <input
                    className="receitas-input"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"
                    required
                />
                <input
                    className="receitas-input"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Valor"
                    required
                />
                <button className="receitas-button" type="submit">Adicionar</button>
            </form>
        </div>
    );
};

export default Receitas;
