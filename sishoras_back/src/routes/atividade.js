const express = require('express');
const { PrismaClient } = require('@prisma/client');

const atividadeRouter = express.Router();
const prisma = new PrismaClient(); // Inicialize o Prisma Client aqui

atividadeRouter.get('/buscar', async (req, res) => {
    const { descricao, qtdHoras, situacao } = req.query; // Usar req.query para GET

    try {
        // Busca atividades com base na descrição, quantidade de horas e situação
        const atividades = await prisma.atividade.findMany({
            select: {
                descricao: true,
                qtdHoras: true,
                situacao: true
            }
        });

        if (atividades.length === 0) {
            console.log('Atividade não encontrada');
            return res.status(404).json({ message: 'Atividade não encontrada' });
        }

        // Retorna as atividades encontradas
        res.json(atividades);
        
    } catch (error) {
        console.error('Erro ao buscar atividade:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
atividadeRouter.get('/buscar/:idAluno', async (req, res) => {
    const { idAluno } = req.params; // Usar req.params para pegar o idAluno

    try {
        // Busca atividades com base no idAluno
        const atividades = await prisma.atividade.findMany({
            where: {
                aluno_id: parseInt(idAluno), // Certifique-se de que o campo é compatível com o tipo de dado do banco
            },
            select: {
                descricao: true,
                qtdHoras: true,
                situacao: true,
            }
        });

        if (atividades.length === 0) {
            console.log('Atividade não encontrada para esse aluno');
            return res.status(404).json({ message: 'Atividades não encontradas para esse aluno' });
        }

        // Retorna as atividades encontradas para o aluno
        res.json(atividades);
        
    } catch (error) {
        console.error('Erro ao buscar atividades por idAluno:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


module.exports = atividadeRouter;
