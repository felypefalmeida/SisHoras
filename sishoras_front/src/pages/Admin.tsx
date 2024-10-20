import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import '../assets/styles/Aluno.css';
import Header from '../components/Header'; // Importando o Header

const Admin: React.FC = () => {
  const [usuarioNome, setUsuarioNome] = useState('');

    useEffect(() => {
        const prinome = localStorage.getItem('usuarioNome');
        if (prinome) {
            setUsuarioNome(prinome.split(' ')[0]); // Pega o primeiro nome
        }
    }, []);
  return (
    <div>
      <Header usuarioNomeCompleto={usuarioNome} />
      <h1>Painel do Administrador</h1>
      <p>Aqui o administrador pode gerenciar todas as atividades e usuários.</p>
    </div>
  );
};

export default Admin;
