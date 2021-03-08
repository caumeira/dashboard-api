/*
  Warnings:

  - You are about to drop the `video_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "video_links";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "video_files" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "videoId" INTEGER NOT NULL,
    FOREIGN KEY ("videoId") REFERENCES "user_videos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
