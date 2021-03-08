/*
  Warnings:

  - Added the required column `fileName` to the `video_links` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_video_links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "link" TEXT,
    "videoId" INTEGER NOT NULL,
    FOREIGN KEY ("videoId") REFERENCES "user_videos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_video_links" ("id", "link", "videoId") SELECT "id", "link", "videoId" FROM "video_links";
DROP TABLE "video_links";
ALTER TABLE "new_video_links" RENAME TO "video_links";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
