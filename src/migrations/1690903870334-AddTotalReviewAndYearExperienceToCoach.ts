import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTotalReviewAndYearExperienceToCoach1690903870334 implements MigrationInterface {
    name = 'AddTotalReviewAndYearExperienceToCoach1690903870334'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('coach', [new TableColumn({
            name: 'totalComment',
            type: 'numeric',
            isNullable: true,
            default: 0
        }), new TableColumn({
            name: 'yearExperience',
            type: 'numeric',
            isNullable: true,
            default: 0
        }),
        new TableColumn({
            name: 'averageCost',
            type: 'numeric',
            isNullable: true,
            default: 0
        })
    ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('coach', ['totalComment', 'yearExperience', 'averageCost'])
    }

}
