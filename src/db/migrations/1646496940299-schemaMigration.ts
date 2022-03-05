import {MigrationInterface, QueryRunner} from "typeorm";

export class schemaMigration1646496940299 implements MigrationInterface {
    name = 'schemaMigration1646496940299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`workflowId\` int NULL, UNIQUE INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` (\`user_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workflow\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`statge\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`workflowId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`description\` varchar(255) NOT NULL, \`color\` varchar(255) NOT NULL, \`statgeId\` int NULL, \`userId\` int NULL, \`pipelineId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pipline\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`workflowId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_e6bb170074e36d70ed6dcec998c\` FOREIGN KEY (\`workflowId\`) REFERENCES \`workflow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`statge\` ADD CONSTRAINT \`FK_2162e386854bae28d948acdd87f\` FOREIGN KEY (\`workflowId\`) REFERENCES \`workflow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_36b58280e4a8483a122f6e02b89\` FOREIGN KEY (\`statgeId\`) REFERENCES \`statge\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_f316d3fe53497d4d8a2957db8b9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_cbeb358aafb035c7ecd4f8db389\` FOREIGN KEY (\`pipelineId\`) REFERENCES \`pipline\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pipline\` ADD CONSTRAINT \`FK_779b0a4321a2bb619064e8b5a42\` FOREIGN KEY (\`workflowId\`) REFERENCES \`workflow\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO \`workflow\` (\`name\`) VALUES ('scaleUp')`);
        await queryRunner.query(`INSERT INTO \`user\` (\`name\`, \`user_name\`, \`password\`, \`workflowId\`) VALUES ('test', 'test', '$2b$12$Gx9DlSS6ciVqajwjXNAGW.hA7IFVpy7Mfy0HOZ1b5xxbdk/MjDAEy', '1')`);
        await queryRunner.query(`INSERT INTO \`statge\` (\`name\`,  \`workflowId\`) VALUES ('todo', '1')`);
        await queryRunner.query(`INSERT INTO \`statge\` (\`name\`,  \`workflowId\`) VALUES ('in progress', '1')`);
        await queryRunner.query(`INSERT INTO \`statge\` (\`name\`,  \`workflowId\`) VALUES ('test', '1')`);
        await queryRunner.query(`INSERT INTO \`statge\` (\`name\`,  \`workflowId\`) VALUES ('done', '1')`);
        await queryRunner.query(`INSERT INTO \`pipline\` (\`name\`,  \`workflowId\`) VALUES ('done', '1')`);

        await queryRunner.query(`INSERT INTO \`task\` (\`name\`, \`description\`, \`color\`, \`statgeId\`, \`userId\`, \`pipelineId\` ) VALUES ('task', 'some text', '#FFF', '1', '1', '1')`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`pipline\` DROP FOREIGN KEY \`FK_779b0a4321a2bb619064e8b5a42\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_cbeb358aafb035c7ecd4f8db389\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_f316d3fe53497d4d8a2957db8b9\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_36b58280e4a8483a122f6e02b89\``);
        await queryRunner.query(`ALTER TABLE \`statge\` DROP FOREIGN KEY \`FK_2162e386854bae28d948acdd87f\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_e6bb170074e36d70ed6dcec998c\``);
        await queryRunner.query(`DROP TABLE \`pipline\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`statge\``);
        await queryRunner.query(`DROP TABLE \`workflow\``);
        await queryRunner.query(`DROP INDEX \`IDX_d34106f8ec1ebaf66f4f8609dd\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
