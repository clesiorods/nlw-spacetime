-- CreateTable
CREATE TABLE "Userteste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "githubId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatarUrl" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Userteste_githubId_key" ON "Userteste"("githubId");
