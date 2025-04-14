/*
  Warnings:

  - Added the required column `desc` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Movies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFav` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `episodes` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Season` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Season` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movies" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "height" TEXT NOT NULL,
ADD COLUMN     "isFav" BOOLEAN NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Season" ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "episodes" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "year" TEXT NOT NULL;
