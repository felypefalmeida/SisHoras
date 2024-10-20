const express = require('express');
const { PrismaClient } = require('@prisma/client');

const grupoRouter = express.Router();
const prisma = new PrismaClient(); // Inicialize o Prisma Client aqui






module.exports = grupoRouter;
