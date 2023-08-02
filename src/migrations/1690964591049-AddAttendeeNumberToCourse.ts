import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAttendeeNumberToCourse1690964591049 implements MigrationInterface {
    name = 'AddAttendeeNumberToCourse1690964591049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('course', new TableColumn({
            name: 'attendeeNumber',
            type: 'numeric',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('course', 'attendeeNumber');
    }

}
