import { Controller, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CoachCertificateEntity, CoachEntity, CoachSkillEntity, CourseAttendeeEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity]),
            TypeOrmModule.forFeature([CourseCalendarEntity]),
            TypeOrmModule.forFeature([CoachEntity]),
            TypeOrmModule.forFeature([CoachCertificateEntity]),
            TypeOrmModule.forFeature([CoachSkillEntity]),
            TypeOrmModule.forFeature([CourseAttendeeEntity]),
        ],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule{

}