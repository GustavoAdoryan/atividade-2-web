import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase.ts'; // Importe a configuração do Firestore

interface FinancialData {
    id: string;
    description: string;
    amount: number;
}

interface DataContextType {
    incomes: FinancialData[];
    expenses: FinancialData[];
    addIncome: (income: Omit<FinancialData, 'id'>) => Promise<void>;
    addExpense: (expense: Omit<FinancialData, 'id'>) => Promise<void>;
    removeIncome: (id: string) => Promise<void>;
    removeExpense: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incomes, setIncomes] = useState<FinancialData[]>([]);
    const [expenses, setExpenses] = useState<FinancialData[]>([]);

    useEffect(() => {
        const unsubscribeIncomes = onSnapshot(collection(db, 'incomes'), (snapshot) => {
            const incomeData = snapshot.docs.map(doc => {
                const data = doc.data();
                if (typeof data.description !== 'string' || typeof data.amount !== 'number') {
                    console.warn(`Documento inválido encontrado na coleção 'incomes':`, doc.id, data);
                    return null; // Retorna null se o documento estiver incorreto
                }
                return { id: doc.id, ...data } as FinancialData; // Retorna FinancialData válido
            }).filter(Boolean) as FinancialData[];  // Remove os nulls e força o tipo para FinancialData[]
            console.log('Incomes recebidos:', incomeData);
            setIncomes(incomeData); // Agora o TypeScript sabe que não há valores null no array
        });

        const unsubscribeExpenses = onSnapshot(collection(db, 'expenses'), (snapshot) => {
            const expenseData = snapshot.docs.map(doc => {
                const data = doc.data();
                if (typeof data.description !== 'string' || typeof data.amount !== 'number') {
                    console.warn(`Documento inválido encontrado na coleção 'expenses':`, doc.id, data);
                    return null;
                }
                return { id: doc.id, ...data } as FinancialData;
            }).filter(Boolean) as FinancialData[];  // Remove os nulls e força o tipo para FinancialData[]
            console.log('Expenses recebidos:', expenseData);
            setExpenses(expenseData);
        });

        return () => {
            unsubscribeIncomes();
            unsubscribeExpenses();
        };
    }, []);

    const addIncome = async (income: Omit<FinancialData, 'id'>) => {
        try {
            await addDoc(collection(db, 'incomes'), income);
            console.log('Receita adicionada com sucesso:', income);
        } catch (error) {
            console.error('Erro ao adicionar receita:', error);
        }
    };

    const addExpense = async (expense: Omit<FinancialData, 'id'>) => {
        try {
            await addDoc(collection(db, 'expenses'), expense);
            console.log('Despesa adicionada com sucesso:', expense);
        } catch (error) {
            console.error('Erro ao adicionar despesa:', error);
        }
    };

    const removeIncome = async (id: string) => {
        await deleteDoc(doc(db, 'incomes', id));
    };

    const removeExpense = async (id: string) => {
        await deleteDoc(doc(db, 'expenses', id));
    };

    return (
        <DataContext.Provider value={{ incomes, expenses, addIncome, addExpense, removeIncome, removeExpense }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
