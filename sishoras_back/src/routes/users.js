const express = require('express');
const router = express.Router();

// Endpoint para obter todos os usuários
router.get('/', (req, res) => {
    // Lógica para buscar usuários
    res.json([{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }]);
});

// Endpoint para criar um novo usuário
router.post('/', (req, res) => {
    const { name, email } = req.body;
    // Lógica para criar um novo usuário
    res.json({ message: 'Usuário criado com sucesso!' });
});

module.exports = router;
