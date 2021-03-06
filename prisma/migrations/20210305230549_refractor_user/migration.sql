/*
  Warnings:

  - You are about to drop the column `userName` on the `users` table. All the data in the column will be lost.
  - Made the column `name` on table `users` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "users.userName_unique";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("roleId") REFERENCES "roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users" ("id", "name", "email", "password", "roleId", "createdAt") SELECT "id", "name", "email", "password", "roleId", "createdAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users.name_unique" ON "users"("name");
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
