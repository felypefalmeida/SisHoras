const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar ao MySQL
const testDbConnection = async () => {
    try {
        await prisma.$connect();
        console.log('Conectado ao MySQL com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    }
};

testDbConnection();

// Usar as rotas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
