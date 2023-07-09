import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1688918175463 implements MigrationInterface {
    name = 'InitDatabase1688918175463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attendees" ("courseID" character varying NOT NULL, "studentID" character varying NOT NULL, CONSTRAINT "PK_69a1c5e24a92907300df618650d" PRIMARY KEY ("courseID", "studentID"))`);
        await queryRunner.query(`CREATE TABLE "certificate" ("CoachID" character varying NOT NULL, "certificate" character varying NOT NULL, CONSTRAINT "PK_93e56ee2ba1aa567616e1c6ad1d" PRIMARY KEY ("CoachID", "certificate"))`);
        await queryRunner.query(`CREATE TABLE "courses" ("Title" character varying NOT NULL, "coachID" character varying NOT NULL, "description" character varying, "image" character varying, "maxSlot" integer, "cost" money, "status" integer, "level" integer, "join_link" character varying, CONSTRAINT "PK_0d5e08e4e76b93cb9702725137e" PRIMARY KEY ("Title", "coachID"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("coachID" character varying NOT NULL, "studentID" character varying NOT NULL, "comment" character varying, "date" TIMESTAMP DEFAULT now(), "rate" integer, CONSTRAINT "PK_bd5a287bdb16bf3a9f6ba3b4270" PRIMARY KEY ("coachID", "studentID"))`);
        await queryRunner.query(`CREATE TABLE "courseCalendar" ("CoachID" character varying NOT NULL, "CourseID" character varying NOT NULL, "start" TIMESTAMP NOT NULL DEFAULT now(), "end" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_84b75cf596e4af89785917d149b" PRIMARY KEY ("CoachID", "CourseID", "start"))`);
        await queryRunner.query(`CREATE TABLE "paymentHistory" ("CoachID" character varying NOT NULL, "studentID" character varying NOT NULL, "CourseID" character varying NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), "money" character varying NOT NULL, CONSTRAINT "PK_553d2604f98a1abe88390bc6e0e" PRIMARY KEY ("studentID", "CourseID", "time"))`);
        await queryRunner.query(`CREATE TABLE "sample_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_e873152a04c344da778041e482c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skills" ("CoachID" character varying NOT NULL, "skill" character varying NOT NULL, CONSTRAINT "PK_31503b007f15f5b08600187cf63" PRIMARY KEY ("CoachID", "skill"))`);
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "PK_c2ca0875fe0755b197d0147713d"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "totalStudent"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "totalCourse"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "coachID" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "PK_89795b41134ddb1ab71de282d3e" PRIMARY KEY ("coachID")`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "classTaught" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "costPerClass" money`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "studentNumber" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "wallet" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "userName" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "totalRate"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "totalRate" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "rateTurn"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "rateTurn" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_8e1f623798118e629b46a9e6299" PRIMARY KEY ("phone")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_8e1f623798118e629b46a9e6299"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "rateTurn"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "rateTurn" numeric`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "totalRate"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "totalRate" numeric`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userName"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "wallet"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "studentNumber"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "costPerClass"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "classTaught"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "PK_89795b41134ddb1ab71de282d3e"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "coachID"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "totalCourse" numeric`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "totalStudent" numeric`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "PK_c2ca0875fe0755b197d0147713d" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "skills"`);
        await queryRunner.query(`DROP TABLE "sample_entity"`);
        await queryRunner.query(`DROP TABLE "paymentHistory"`);
        await queryRunner.query(`DROP TABLE "courseCalendar"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`DROP TABLE "certificate"`);
        await queryRunner.query(`DROP TABLE "attendees"`);
    }

}
