import React from 'react';
import '../assets/styles/Header.css'; // Importe o CSS do Header

interface HeaderProps {
    usuarioNomeCompleto: string; // Define que o prop é do tipo string
}

const Header: React.FC<HeaderProps> = ({ usuarioNomeCompleto }) => {
    console.log('Nome do usuário recebido:', usuarioNomeCompleto); // Verifique se o nome está sendo passado

    const obterSaudacao = () => {
        const agora = new Date();
        const hora = agora.getHours();

        if (hora < 12) {
            return 'Bom dia';
        } else if (hora < 18) {
            return 'Boa tarde';
        } else {
            return 'Boa noite';
        }
    };

    return (
        <header className="header-container">
            <h1 className='nomeP'>Sishoras</h1>
            <p className="saudacao">{`${obterSaudacao()}, ${usuarioNomeCompleto}`}</p>
        </header>
    );
};

export default Header;
