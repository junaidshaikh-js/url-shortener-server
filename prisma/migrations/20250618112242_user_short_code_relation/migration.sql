-- AlterTable
ALTER TABLE "ShortCode" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "ShortCode" ADD CONSTRAINT "ShortCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
