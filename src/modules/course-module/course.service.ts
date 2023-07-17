import { CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO, GetCourse } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize } from "@Serialize/index.ts";
import { log } from "console";
import { notEqual } from "assert";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseEntity) private courseSchedulerRepo: Repository<CourseEntity>,){}

    async updateCourse(courseDto: CreateCourseDTO){
        try{
            const currentCourse = await this.courseRepo.findOne({
                where: {
                    code: courseDto.code,
                    deletedAt: IsNull(),
                }
            })
            
            if (!currentCourse){
                const course = await this.courseRepo.create(courseDto)

                await this.courseRepo.save(course)
                
                const serializeCourse = plainToInstance(CourseSerialize, course)
                
                return {meta: {code: 200, msg: 'success'}, data: serializeCourse}
            }

            currentCourse.updateAttributes(courseDto);

            await this.courseRepo.save(currentCourse);

            const serializeCourse = plainToInstance(CourseSerialize, currentCourse);

            return {meta: {code: 200, msg: 'success'}, data: serializeCourse}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
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

    async findCourse(courseDto: FindCourseDTO){
        try{
            const course = await this.courseRepo.find({
                select: {
                    code: true,
                    coachId: true,
                    title: true,
                    banner: true,
                    status: true,
                    level: true,
                    maxSlot: true,
                    cost: true,
                    description: true,
                },
                where:  {
                    title: courseDto.title ? courseDto.title : Not(null),
                    level: courseDto.level ? courseDto.level : Not(null),
                    status: courseDto.status ? courseDto.status : Not(null),
                    maxSlot: courseDto.maxSlot ? courseDto.maxSlot : Not(null),
                    code: courseDto.code ? courseDto.code : Not(null),
                    coachId: courseDto.coachId ? courseDto.coachId : Not(null)
                },
                skip: courseDto.windowIndex * MAX_NUMBER_COURSE_LOAD,
                take: MAX_NUMBER_COURSE_LOAD,
            })
            
            const serializeCourses = plainToInstance(CourseSerialize, course)
            return {meta: {code: 200, msg: 'success'}, data: serializeCourses}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
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

    async deleteCourse(getCourse: GetCourse){
        try{
            const course = await this.courseRepo.delete({
                code: getCourse.code
            })
            
            const serializeCourses = plainToInstance(CourseSerialize, course)
            return {meta: {code: 200, msg: 'success'}, data: serializeCourses}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
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

    async getScheduler(courseID: number){
        try{

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

    async changeScheduler(courseID: number, ){
        try{

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