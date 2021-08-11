import {MigrationInterface, QueryRunner} from "typeorm";

export class alterNewsTable1627988546174 implements MigrationInterface {
    name = 'alterNewsTable1627988546174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `news` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `news` ADD `body` text NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `news` DROP COLUMN `body`");
        await queryRunner.query("ALTER TABLE `news` ADD `body` varchar(255) NOT NULL");
    }

}
