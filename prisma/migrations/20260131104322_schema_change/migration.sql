/*
  Warnings:

  - The primary key for the `PostFavorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostFavorite` table. All the data in the column will be lost.
  - The primary key for the `PostLike` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `PostLike` table. All the data in the column will be lost.
  - Added the required column `authorID` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postID_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_blogID_fkey";

-- DropForeignKey
ALTER TABLE "PostFavorite" DROP CONSTRAINT "PostFavorite_postID_fkey";

-- DropForeignKey
ALTER TABLE "PostFavorite" DROP CONSTRAINT "PostFavorite_userID_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_postID_fkey";

-- DropForeignKey
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_userID_fkey";

-- DropIndex
DROP INDEX "PostFavorite_userID_postID_key";

-- DropIndex
DROP INDEX "PostLike_userID_postID_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PostFavorite" DROP CONSTRAINT "PostFavorite_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "PostFavorite_pkey" PRIMARY KEY ("userID", "postID");

-- AlterTable
ALTER TABLE "PostLike" DROP CONSTRAINT "PostLike_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "PostLike_pkey" PRIMARY KEY ("userID", "postID");

-- CreateIndex
CREATE INDEX "Post_createdAt_idx" ON "Post"("createdAt");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_blogID_fkey" FOREIGN KEY ("blogID") REFERENCES "Blog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostLike" ADD CONSTRAINT "PostLike_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostFavorite" ADD CONSTRAINT "PostFavorite_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostFavorite" ADD CONSTRAINT "PostFavorite_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
