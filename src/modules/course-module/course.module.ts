import { Controller, Module } from "@nestjs/common";
import { CourseController } from "./course.controller";
import { CourseService } from "./course.service";
import { CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([CourseEntity])],
    controllers: [CourseController],
    providers: [CourseService],
})
export class CourseModule{

}