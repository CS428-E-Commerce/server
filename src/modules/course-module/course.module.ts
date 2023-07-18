import { Controller, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity]), TypeOrmModule.forFeature([CourseCalendarEntity])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule{

}