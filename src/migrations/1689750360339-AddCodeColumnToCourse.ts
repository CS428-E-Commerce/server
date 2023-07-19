import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodeColumnToCourse1689750360339 implements MigrationInterface {
    name = 'AddCodeColumnToCourse1689750360339'

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn('course', new TableColumn({
            name: 'code',
            type: 'varchar',
            isNullable: false
       }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('course', 'code');
    }

}
