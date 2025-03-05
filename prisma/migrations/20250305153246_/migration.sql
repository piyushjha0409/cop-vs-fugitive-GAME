/*
  Warnings:

  - A unique constraint covering the columns `[copId]` on the table `CopSelection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Cop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CopSelection_copId_key" ON "CopSelection"("copId");

-- AddForeignKey
ALTER TABLE "CopSelection" ADD CONSTRAINT "CopSelection_copId_fkey" FOREIGN KEY ("copId") REFERENCES "Cop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
