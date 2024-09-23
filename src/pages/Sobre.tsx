import React from 'react';
import '../styles/Sobre.css';

const Sobre: React.FC = () => {
    return (
        <div className="sobre-container">
            <h2 className="sobre-title">Sobre o Criador</h2>
            <p className="sobre-text">
                Este site foi criado por Gustavo Henrique Adoryan, um engenheiro de software em formação especializado em desenvolvimento backend.
            </p>
            <p className="sobre-text">
                <a href="https://www.linkedin.com/in/gustavoadoryan/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </p>
            <p className="sobre-text">
                <a href="https://github.com/GustavoAdoryan" target="_blank" rel="noopener noreferrer">GitHub</a>
            </p>
        </div>
    );
};

export default Sobre;
