import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class InitDatabase1688401721212 implements MigrationInterface {
    name = 'InitDatabase1688401721212';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        isUnique: true,
                    }),
                    new TableColumn({
                        name: 'email',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'phone',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'password',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'address',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'username',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'role',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'coach',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'userId',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'totalRate',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'rateTurn',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'totalStudent',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'totalCourse',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'coach_skill',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'coachId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'skill',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'coach_certificate',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'coachId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'certificate',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'course',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'coachId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'title',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'banner',
                        type: 'text',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'status',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'level',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'maxSlot',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'cost',
                        type: 'numeric',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'description',
                        type: 'text',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'zoomLink',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'course_attendee',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'courseId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'userId',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'course_schedule',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'courseId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'coachId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'startTime',
                        type: 'timestamp',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'endTime',
                        type: 'timestamp',
                        isNullable: false,                    
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );

        await queryRunner.createTable(
            new Table({
                name: 'course_discussion',
                columns: [
                    new TableColumn({
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',                    
                    }),
                    new TableColumn({
                        name: 'courseId',
                        type: 'int',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'userId',
                        type: 'varchar',
                        isNullable: false,
                    }),
                    new TableColumn({
                        name: 'rate',
                        type: 'numeric',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'comment',
                        type: 'varchar',
                        isNullable: true,
                    }),
                    new TableColumn({
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    }),
                    new TableColumn({
                        name: 'deletedAt',
                        type: 'timestamp',
                        isNullable: true,
                    }),
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "coach"`);
        await queryRunner.query(`DROP TABLE "coach_skill"`);
        await queryRunner.query(`DROP TABLE "coach_certificate"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "course_attendee"`);
        await queryRunner.query(`DROP TABLE "course_schedule"`);
        await queryRunner.query(`DROP TABLE "course_discussion"`);
    }
}
