import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence, User } from 'firebase/auth'; // Ajuste a importação correta
import { auth } from '../firebase.ts'; // Certifique-se de que este caminho está correto para onde você inicializou o Firebase

interface AuthContextType {
    user: User | null; // Aqui usamos o tipo User do firebase/auth
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // Usamos o tipo User do Firebase aqui

    // Configurando a persistência de login para manter a sessão ativa
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                    setUser(currentUser);
                });
                return () => unsubscribe();
            })
            .catch((error) => {
                console.error('Erro ao definir a persistência de login: ', error);
            });
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
        alert('Você foi desconectado com sucesso.');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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
