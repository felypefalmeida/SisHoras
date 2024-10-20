const express = require('express');
const { PrismaClient } = require('@prisma/client');

const cursoRouter = express.Router();
const prisma = new PrismaClient(); // Inicialize o Prisma Client aqui

cursoRouter.get('/buscar', async (req, res) => {
    const { id } = req.query; // Usar req.query para GET

    try {
        // Busca atividades com base na descrição, quantidade de horas e situação
        const curso = await prisma.curso.findMany({
            select: {
                id:true, nome:true, horas_complementares:true
            }
        });

        if (curso.length === 0) {
            console.log('Curso não encontrado');
            return res.status(404).json({ message: 'Curso não encontrado' });
        }

        // Retorna as atividades encontradas
        res.json(curso);
        
    } catch (error) {
        console.error('Erro ao buscar curso:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
cursoRouter.get('/buscar/:id', async (req, res) => {
    const { id } = req.params; // Usar req.params para pegar o idAluno

    try {
        // Busca atividades com base no idAluno
        const curso = await prisma.curso.findMany({
            where: {
                id: parseInt(id), // Certifique-se de que o campo é compatível com o tipo de dado do banco
            },
            select: {
                id:true, nome:true, horas_complementares:true
            }
        });

        if (curso.length === 0) {
            console.log('curso não encontrado para esse aluno');
            return res.status(404).json({ message: 'curso não encontrado para esse aluno' });
        }

        // Retorna as atividades encontradas para o aluno
        res.json(curso);
        
    } catch (error) {
        console.error('Erro ao buscar curdo por id:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


module.exports = cursoRouter;
