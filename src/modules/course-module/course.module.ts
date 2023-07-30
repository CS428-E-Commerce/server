import { Controller, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CoachCertificateEntity, CoachEntity, CoachSkillEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity]),
            TypeOrmModule.forFeature([CourseCalendarEntity]),
            TypeOrmModule.forFeature([CoachEntity]),
            TypeOrmModule.forFeature([CoachCertificateEntity]),
            TypeOrmModule.forFeature([CoachSkillEntity]),
        ],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule{

}