import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Despesas from './components/Despesas.tsx';
import Header from './components/Header.tsx';
import Receitas from './components/Receitas.tsx';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { DataProvider } from './context/DataContext.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Sobre from './pages/Sobre.tsx';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <DataProvider>
                <Router>
                    <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/sobre" element={<Sobre />} />
                            <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                            <Route path="/receitas" element={<PrivateRoute element={<Receitas />} />} />
                            <Route path="/despesas" element={<PrivateRoute element={<Despesas />} />} />
                        </Routes>
                </Router>
            </DataProvider>
        </AuthProvider>
    );
};

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" replace />;
};

export default App;
