-- AlterTable
ALTER TABLE `user` ADD COLUMN `refresh_token` VARCHAR(191) NULL,
    ADD COLUMN `token_expiry` DATETIME(3) NULL;
