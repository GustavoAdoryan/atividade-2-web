import React from 'react';
import '../styles/Home.css';  // Importando o CSS da página Home

const Home: React.FC = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Bem-vindo ao Gerenciador de Orçamento Pessoal</h1>
            <p className="home-description">
                Esta é uma aplicação que ajuda você a gerenciar sua renda e despesas mensais.
                Você pode adicionar, editar e excluir entradas de receita e despesas e ver um resumo do seu Dashboard.
            </p>
        </div>
    );
};

export default Home;
