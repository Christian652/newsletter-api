import {MigrationInterface, QueryRunner} from "typeorm";

export class aaaaaaaaaaaaaaaaaaaaaa2muda1627842010779 implements MigrationInterface {
    name = 'aaaaaaaaaaaaaaaaaaaaaa2muda1627842010779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `news` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `body` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `log` (`id` int NOT NULL AUTO_INCREMENT, `operation_type` varchar(255) NOT NULL, `object_type` varchar(255) NOT NULL, `data` text NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `receivers` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `role` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `receivers`");
        await queryRunner.query("DROP TABLE `log`");
        await queryRunner.query("DROP TABLE `news`");
    }

}
