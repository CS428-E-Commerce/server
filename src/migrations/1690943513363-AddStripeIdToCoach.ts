import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddStripeIdToCoach1690943513363 implements MigrationInterface {
    name = 'AddStripeIdToCoach1690943513363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('coach', new TableColumn({
            name: 'stripeId',
            type: 'varchar',
            isNullable: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('coach', 'stripeId');
    }

}
