import { CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize } from "@Serialize/index.ts";
import { log } from "console";
import { notEqual } from "assert";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseEntity) private courseSchedulerRepo: Repository<CourseEntity>,){}

    async create(courseDto: CreateCourseDTO){
        try{
            const newCourse = await this.courseRepo.create(courseDto);

            const serializeCourse = plainToInstance(CourseSerialize, newCourse)

            return {meta: {code: 200, msg: 'success'}, data: serializeCourse}


            // const {code} = courseDto;

            // const currentCourse = await this.courseRepo.findOneBy({
            //     code,
            //     deletedAt: IsNull()
            // })
            
            // currentCourse.updateAttributes(courseDto);
            
            // await this.courseRepo.save(currentCourse);

            // const serializeCourse = plainToInstance(CourseSerialize, currentCourse);

            // return {meta: {code: 200, msg: 'success'}, data: serializeCourse}
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

    // async findSome(windowIndex: number){
    //     try{
    //         const courses = await this.courseRepo.find({
    //             select: {
    //                 code: true,
    //                 coachID: true,
    //                 title: true,
    //                 banner: true,
    //                 status: true,
    //                 level: true,
    //                 maxSlot: true,
    //                 cost: true,
    //                 description: true,
    //             },
    //             skip: windowIndex * MAX_NUMBER_COURSE_LOAD,
    //             take: MAX_NUMBER_COURSE_LOAD,
    //         })

    //         const serializeCourses = plainToInstance(CourseSerialize, courses)

    //         return {meta: {code: 200, msg: 'success'}, data: serializeCourses}
    //     }
    //     catch(error){
    //         // handle the exception and return an appropriate response
    //         log('---------------------------------------------')
    //         log(error)
    //         log('---------------------------------------------')
    //         if (error instanceof HttpException) {
    //             throw error;
    //         } else {
    //             console.log(error);

    //             throw new HttpException(
    //                 {
    //                     statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    //                     message: 'Internal server error',
    //                 },
    //                 HttpStatus.INTERNAL_SERVER_ERROR
    //             );
    //         }
    //     }
    // }

    async updateCourse(courseDto: CreateCourseDTO){
        try{
            const {code} = courseDto;

            const currentCourse = await this.courseRepo.findOneBy({
                code,
                deletedAt: IsNull()
            })

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

    async findCustom(courseDto: FindCourseDTO){
        try{
            log('=========---------------------------------------------------------------------======')
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
                where:  {
                    title: courseDto.title ? courseDto.title : Not(null),
                    level: courseDto.level ? courseDto.level : Not(null),
                    status: courseDto.status ? courseDto.status : Not(null),
                    maxSlot: courseDto.maxSlot ? courseDto.maxSlot : Not(null),
                    code: courseDto.code ? courseDto.code : Not(null),
                    coachID: courseDto.coachID ? courseDto.coachID : Not(null)
                },
                skip: courseDto.windowIndex * MAX_NUMBER_COURSE_LOAD,
                take: MAX_NUMBER_COURSE_LOAD,
            })
            log('=========---------------------------------------------------------------------======')

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