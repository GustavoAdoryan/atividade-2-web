import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase.ts';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, where, updateDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext.tsx';

export interface FinancialData {
    id: string;
    description: string;
    amount: number;
}

export interface DataContextType {
    incomes: FinancialData[];
    expenses: FinancialData[];
    addIncome: (income: Omit<FinancialData, 'id'>) => Promise<void>;
    addExpense: (expense: Omit<FinancialData, 'id'>) => Promise<void>;
    removeIncome: (id: string) => Promise<void>;
    removeExpense: (id: string) => Promise<void>;
    updateIncome: (id: string, updatedIncome: Omit<FinancialData, 'id'>) => Promise<void>;
    updateExpense: (id: string, updatedExpense: Omit<FinancialData, 'id'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [incomes, setIncomes] = useState<FinancialData[]>([]);
    const [expenses, setExpenses] = useState<FinancialData[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const incomesQuery = query(collection(db, 'incomes'), where('userId', '==', user.uid));
            const expensesQuery = query(collection(db, 'expenses'), where('userId', '==', user.uid));

            const unsubscribeIncomes = onSnapshot(incomesQuery, (snapshot) => {
                const incomeData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as FinancialData[];
                setIncomes(incomeData);
            });

            const unsubscribeExpenses = onSnapshot(expensesQuery, (snapshot) => {
                const expenseData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as FinancialData[];
                setExpenses(expenseData);
            });

            return () => {
                unsubscribeIncomes();
                unsubscribeExpenses();
            };
        }
    }, [user]);

    const addIncome = async (income: Omit<FinancialData, 'id'>) => {
        await addDoc(collection(db, 'incomes'), { ...income, userId: user?.uid });
    };

    const addExpense = async (expense: Omit<FinancialData, 'id'>) => {
        await addDoc(collection(db, 'expenses'), { ...expense, userId: user?.uid });
    };

    const removeIncome = async (id: string) => {
        await deleteDoc(doc(db, 'incomes', id));
    };

    const removeExpense = async (id: string) => {
        await deleteDoc(doc(db, 'expenses', id));
    };

    const updateIncome = async (id: string, updatedIncome: Omit<FinancialData, 'id'>) => {
        await updateDoc(doc(db, 'incomes', id), updatedIncome);
    };

    const updateExpense = async (id: string, updatedExpense: Omit<FinancialData, 'id'>) => {
        await updateDoc(doc(db, 'expenses', id), updatedExpense);
    };

    return (
        <DataContext.Provider value={{ incomes, expenses, addIncome, addExpense, removeIncome, removeExpense, updateIncome, updateExpense }}>
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
