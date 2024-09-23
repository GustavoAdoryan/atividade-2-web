import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
                    <li><Link to="/receitas" className="nav-link">Receitas</Link></li>
                    <li><Link to="/despesas" className="nav-link">Despesas</Link></li>
                    <li><Link to="/sobre" className="nav-link">Sobre</Link></li>
                    <li><Link to="/login" className="nav-link">Login</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
