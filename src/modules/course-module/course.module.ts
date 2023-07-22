import { Controller, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CoachEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity]),
            TypeOrmModule.forFeature([CourseCalendarEntity]),
            TypeOrmModule.forFeature([CoachEntity]),
        ],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule{

}