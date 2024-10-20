import React, { useEffect, useState } from 'react';
// import '../assets/styles/Coordenador.css'; // Importe o CSS do Coordenador se necessário
import Header from '../components/Header'; // Importando o Header

const Coordenador: React.FC = () => {
    const [usuarioNome, setUsuarioNome] = useState('');

    useEffect(() => {
        const prinome = localStorage.getItem('usuarioNome');
        if (prinome) {
            setUsuarioNome(prinome.split(' ')[0]); // Pega o primeiro nome
        }
    }, []);

    return (
        <div>
            {/* Renderizando o Header aqui, passando o nome do usuário */}
            <Header usuarioNomeCompleto={usuarioNome} />
            
            <h1>Painel do Professor</h1>
            <p>Aqui o professor pode ver e gerenciar suas atividades e alunos.</p>
        </div>
    );
};

export default Coordenador;
