import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
    currentUser: string | null; // Usaremos o email como o usuário autenticado
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    const login = (email: string, password: string) => {
        if (email && password) {  // Verificação simples se o email e senha estão preenchidos
            setCurrentUser(email);  // Define o email como usuário atual
            alert('Login bem-sucedido!');  // Feedback para o usuário
        } else {
            alert('Por favor, insira um email e uma senha válidos.');
        }
    };

    const logout = () => {
        setCurrentUser(null);
        alert('Você saiu da sua conta.');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
