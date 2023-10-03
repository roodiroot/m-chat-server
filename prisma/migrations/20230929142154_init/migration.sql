-- CreateTable
CREATE TABLE "chat" (
    "id" SERIAL NOT NULL,
    "author" TEXT,
    "text" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "chat_author_key" ON "chat"("author");
