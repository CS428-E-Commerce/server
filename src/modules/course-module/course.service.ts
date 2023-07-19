import { CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO, CreateSchedulerDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO, GetCourse, Scheduler } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize, SchedulerSerialize } from "@Serialize/index.ts";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseCalendarEntity) private courseSchedulerRepo: Repository<CourseCalendarEntity>,
                ){}

    async updateCourse(courseDto: CreateCourseDTO){
        try{
            const currentCourse = await this.courseRepo.findOne({
                where: {
                    id: courseDto.id,
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
                    id: true,
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
                    title: courseDto.title ? courseDto.title : null,
                    level: courseDto.level ? courseDto.level : null,
                    status: courseDto.status ? courseDto.status : null,
                    maxSlot: courseDto.maxSlot ? courseDto.maxSlot : null,
                    code: courseDto.code ? courseDto.code : null,
                    coachId: courseDto.coachId ? courseDto.coachId : null,
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
                id: getCourse.id,
            })

            await this.courseSchedulerRepo.delete({
                courseId: getCourse.id
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

    async findScheduler(courseSchedule: Scheduler){
        try{
            const scheduler = await this.courseSchedulerRepo.find({
                select: {
                    id: true,
                    coachId: true,
                    courseId: true,
                    startTime: true,
                    endTime: true,
                },
                where: {
                    courseId: courseSchedule.courseId,
                    startTime: courseSchedule.startTime ? courseSchedule.startTime : null,
                }
            })

            const serializeScheduler = plainToInstance(SchedulerSerialize, scheduler)

            return {meta: {code: 200, msg: 'success'}, data: serializeScheduler}
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

    async updateScheduler(createScheduler: CreateSchedulerDTO){
        try{
            const currentScheduler = await this.courseSchedulerRepo.findOne({
                where: {
                    id: createScheduler.id ? createScheduler.id : Not(null),
                    deletedAt: IsNull(),
                }
            })
            
            if (!currentScheduler){
                const scheduler = await this.courseSchedulerRepo.create(createScheduler)

                await this.courseSchedulerRepo.save(scheduler)
                
                const serializeScheduler = plainToInstance(SchedulerSerialize, scheduler)
                
                return {meta: {code: 200, msg: 'success'}, data: serializeScheduler}
            }

            currentScheduler.updateAttributes(createScheduler);

            await this.courseSchedulerRepo.save(currentScheduler);

            const serializeCourse = plainToInstance(SchedulerSerialize, currentScheduler);

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

    async deleteScheduler(courseScheduler: CreateSchedulerDTO){
        try{
            const scheduler = await this.courseSchedulerRepo.delete({
                id: courseScheduler.id,
            })
            
            const serializeScheduler = plainToInstance(SchedulerSerialize, scheduler)
            return {meta: {code: 200, msg: 'success'}, data: serializeScheduler}
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