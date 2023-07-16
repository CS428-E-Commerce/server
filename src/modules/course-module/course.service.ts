import { CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize } from "@Serialize/index.ts";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseEntity) private courseSchedulerRepo: Repository<CourseEntity>,){}

    async create(createCourseDto: CreateCourseDTO){
        try{
            const newCourse = await this.courseRepo.create(createCourseDto);

            const serializeCourse = plainToInstance(CourseSerialize, newCourse)

            return {meta: {code: 200, msg: 'success'}, data: serializeCourse}
        }
        catch (error) {
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log(error);

                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async length(){
        try{
            return {meta: {code: 200, msg: 'success'}, data: await this.courseRepo.count()}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log(error);

                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async findSome(windowIndex: number){
        try{
            const courses = await this.courseRepo.find({
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

            const serializeCourses = plainToInstance(CourseSerialize, courses)

            return {meta: {code: 200, msg: 'success'}, data: serializeCourses}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log(error);

                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

    async findCustom(courseDto: FindCourseDTO, windowIndex: number = 0){
        try{
            const courses = await this.courseRepo.find({
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
                    {code: courseDto.code},
                    {coachID: courseDto.coachID},
                ],
                skip: windowIndex * MAX_NUMBER_COURSE_LOAD,
                take: MAX_NUMBER_COURSE_LOAD,
            })

            const serializeCourses = plainToInstance(CourseSerialize, courses)
            return {meta: {code: 200, msg: 'success'}, data: serializeCourses}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log(error);

                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
}