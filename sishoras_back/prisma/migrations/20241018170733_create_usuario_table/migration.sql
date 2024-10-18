/*
  Warnings:

  - Added the required column `tipoDeAcesso` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `tipoDeAcesso` VARCHAR(191) NOT NULL;
