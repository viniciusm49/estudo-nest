/*
  Warnings:

  - The `dataCriacao` column on the `Produto` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `dataAtualizacao` on the `Produto` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Produto" DROP COLUMN "dataCriacao",
ADD COLUMN     "dataCriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "dataAtualizacao",
ADD COLUMN     "dataAtualizacao" TIMESTAMP(3) NOT NULL;
