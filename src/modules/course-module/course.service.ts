import { CourseEntity } from "@Entites/index.ts";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO } from "./dto/find-course.dto";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>){}

    create(createCourseDto: CreateCourseDTO){
        const newCourse = this.courseRepo.create(createCourseDto);
        return this.courseRepo.save(newCourse);
    }

    length(){
        return this.courseRepo.count();
    }

    findSome(windowIndex: number){
        return this.courseRepo.find({
            select: {
                code: true,
                coachID: true,
                title: true,
                banner: true,
                status: true,
                level: true,
                maxSlot: true,
                cost: true,
                description: true,
            },
            skip: windowIndex * MAX_NUMBER_COURSE_LOAD,
            take: MAX_NUMBER_COURSE_LOAD,
        })
    }

    findOne(code: string){
        return this.courseRepo.findOne({
            select: {
                code: true,
                coachID: true,
                title: true,
                banner: true,
                status: true,
                level: true,
                maxSlot: true,
                cost: true,
                description: true,
            },
            where: {
                code: code
            }
        })
    }

    findSomeOfCoach(coachID: number){
        return this.courseRepo.find({
            select: {
                code: true,
                coachID: true,
                title: true,
                banner: true,
                status: true,
                level: true,
                maxSlot: true,
                cost: true,
                description: true,
            },
            where: {
                coachID: coachID
            }
        })
    }

    findCustom(courseDto: FindCourseDTO){
        return this.courseRepo.find({
            select: {
                code: true,
                coachID: true,
                title: true,
                banner: true,
                status: true,
                level: true,
                maxSlot: true,
                cost: true,
                description: true,
            },
            where: [
                {title: courseDto.title},
                {level: courseDto.level},
                {status: courseDto.status},
                {maxSlot: courseDto.maxSlot},
            ]
        })
    }
}