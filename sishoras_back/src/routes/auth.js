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
        });
        console.log('Usuário encontrado:', usuario); 
        // Verificando se o usuário foi encontrado e se a senha  dele está correta
        if (usuario && usuario.senha === senha) {
            res.json({ message: 'Login realizado com sucesso!', tipoDeAcesso: usuario.tipoDeAcesso });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }        
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = router;
