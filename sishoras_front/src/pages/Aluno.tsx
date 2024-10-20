import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando Bootstrap
import 'chart.js/auto';
import '../assets/styles/Aluno.css';
import Header from '../components/Header'; // Importando o Header
import axios from 'axios';

// Definindo a interface para Atividade e Curso
interface Atividade {
    id: number;
    descricao: string;
    situacao: 'pendente' | 'aprovada' | 'rejeitada'; 
    qtdHoras: number
}

interface Curso {
    id: number;
    horas_complementares: number; // Campo que contém as horas complementares
}

const Aluno = () => {
    const [atividades, setAtividades] = useState<Atividade[]>([]); // Tipando o estado de atividades
    const [usuarioNome, setUsuarioNome] = useState('');
    const [progresso, setProgresso] = useState({ pendente: 0, aprovadas: 0, rejeitada: 0 });
    const [horas_complementares, setHorasComplementares] = useState<number>(0);

    useEffect(() => {
        const fetchDados = async () => {
            try {
                const usuarioId = localStorage.getItem('usuarioId');
                const cursoid = localStorage.getItem('cursoId')
                // Primeiro busca as atividades
                const atividadesResponse = await axios.get(`http://localhost:3000/atividade/buscar/${usuarioId}`);
                setAtividades(atividadesResponse.data);
                calcularProgresso(atividadesResponse.data);
            
                const cursoResponse = await axios.get(`http://localhost:3000/curso/buscar/${cursoid}`);
                setHorasComplementares(cursoResponse.data[0].horas_complementares); // Define as horas complementares
                

            } catch (error) {
                console.error('Erro ao buscar dados do curso:', error);
            }
        };

        fetchDados();
    }, []);

    useEffect(() => {
        const prinome = localStorage.getItem('usuarioNome');
        if (prinome) {
            setUsuarioNome(prinome.split(' ')[0]); // Pega o primeiro nome
        }
    }, []);

    // Tipando a função calcularProgresso
    const calcularProgresso = (atividades: Atividade[]) => {
        const statusCount = { pendente: 0, aprovadas: 0, rejeitada: 0 };

        atividades.forEach((atividade) => {
            switch (atividade.situacao) {
                case 'pendente':
                    statusCount.pendente += 1;
                    break;
                case 'aprovada':
                    statusCount.aprovadas += 1;
                    break;
                case 'rejeitada':
                    statusCount.rejeitada += 1;
                    break;
                default:
                    break;
            }
        });

        setProgresso(statusCount);
    };

    // Cálculo do percentual de atividades aprovadas em relação às horas complementares
    const totalAtividades = atividades.length;
    const horasAprovadas = atividades.reduce((soma, atividade) => soma + atividade.qtdHoras, 0);;
    
    const percentualAprovado = Math.min(100, horas_complementares > 0 ? (horasAprovadas / horas_complementares) * 100 : 0); // Cálculo do percentual de horas aprovadas, limitado a 100%
    // console.log('totalAtividas',totalAtividades)
    // console.log('horasAprovadas',horasAprovadas)
    // console.log('percentualAPro',percentualAprovado)

    // Dados do gráfico em barra (status das atividades)
    const barData = {
        labels: ['Pendente', 'Aprovada', 'Rejeitada'],
        datasets: [
            {
                label: 'Progresso das Atividades',
                data: [progresso.pendente, progresso.aprovadas, progresso.rejeitada],
                backgroundColor: ['#36A2EB', '#4CAF50', '#FFC107'],
                hoverBackgroundColor: ['#36A2EB', '#4CAF50', '#FFC107'],
            },
        ],
    };

    return (
        <div className="aluno-container">
            <Header usuarioNomeCompleto={usuarioNome} />

            <div className="menu-lateral">
                <ul>
                    <li>Cadastrar Atividade</li>
                    <li>Relatório</li>
                    <li>Dados do Perfil</li>
                    <li>Ajuda com o Sistema</li>
                    <li>Logout</li>
                </ul>
            </div>

            <div className="conteudo-principal">
                <h2>Progresso de Atividades</h2>

                <div className="grafico-e-listagem">
                    {/* Gráfico em Barra - Progresso das Atividades */}
                    <div className="grafico-container">
                        <Bar data={barData} />
                    </div>

                    {/* Barra de Progresso Personalizada */}
                    <div className="barra-progresso-container">
                        <div className="barra-progresso" style={{ width: `${percentualAprovado}%` }}>
                            <span>{percentualAprovado.toFixed()}%</span>
                        </div>
                    </div>

                    {/* Listagem de Atividades */}
                    <div className="lista-container">
                        <h3>Listagem de Atividades</h3>
                        <ul className="lista-atividades">
                            {atividades.map((atividade) => (
                                <li key={atividade.id} className="item-atividade">
                                    <strong>{atividade.descricao}</strong> - Status: {atividade.situacao} - Horas Cadastradas: {atividade.qtdHoras}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aluno;
