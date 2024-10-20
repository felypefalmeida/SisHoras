const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient(); // Inicialize o Prisma Client aqui

// Endpoint para login
router.post('/login', async (req, res) => {
    const { cpf, senha } = req.body; // Certifique-se de que está recebendo a senha corretamente

    try {
        // Verifica se o usuário existe com base no CPF
        const usuario = await prisma.usuario.findUnique({ 
            where: { cpf }, 
            include: {
                administrador:true,
                aluno: true, // Supondo que 'aluno' é o nome da relação com a tabela 'aluno'
                coordenador: true, // Se houver uma tabela separada para coordenadores
            }
        });

        // Verificando se o usuário foi encontrado e se a senha dele está correta
        if (usuario && usuario.senha === senha) {
            // Retorna os dados do usuário
            console.log('Usuário encontrado:', usuario);
            const responseData = {
                message: 'Login realizado com sucesso!',
                tipoDeAcesso: usuario.tipoDeAcesso,
                id: usuario.aluno[0].id,
                idCurso: usuario.aluno[0].curso_id,
                nome: usuario.aluno.length > 0 ? usuario.aluno[0].nome 
                : usuario.coordenador.length > 0 ? usuario.coordenador[0].nome 
                : usuario.administrador.length > 0 ? usuario.administrador[0].nome // Adiciona o nome do administrador
                : null,
                cpf: usuario.cpf,
            };
            
            res.json(responseData);

        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }        
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = router;
