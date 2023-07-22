import { CoachEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO, GetCourse, GetID, Scheduler } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize, SchedulerSerialize } from "@Serialize/index.ts";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseCalendarEntity) private courseSchedulerRepo: Repository<CourseCalendarEntity>,
                @InjectRepository(CoachEntity) private coachRepository: Repository<CoachEntity>,
                ){}
    async createCourse(coursedto: CreateCourseDTO){
        try{
            //CREATE NEW COURSE
            const course = await this.courseRepo.create(coursedto)

            await this.courseRepo.save(course)
            
            const serializeCourse = plainToInstance(CourseSerialize, course)

            //UPDATE COACH TcurrentCourseOTAL COURSE
            const coach = await this.coachRepository.findOne({
                where: {
                    id: course.coachId
                }
            })

            // RAISE ERROR IF COACH IS NOT EXISTED
            if (!coach){
                throw new NotFoundException(
                    "Coach of this course is not found"
                )
            }

            coach.totalCourse += 1

            await this.courseRepo.save(coach);

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

    async updateCourse(courseDto: UpdateCourseDTO){
        try{
            const currentCourse = await this.courseRepo.findOne({
                where: {
                    id: courseDto.id,
                    deletedAt: IsNull(),
                }
            })
            
            if (!currentCourse){                
                throw new NotFoundException(
                    "Course is not found"
                )
            }

            return {meta: {code: 404, msg: 'Id cannot be found in the database'}, data: {}}
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
            const queryBuilder = this.courseRepo.createQueryBuilder('course')
            //TODO: CHANGE FILTER TYPE
            const listCourse = await queryBuilder.select()
                                            .where(
                                                "course.code LIKE :value",
                                                {value: courseDto.code ? courseDto.code : null}
                                            )
                                            .orWhere(
                                                "course.coachId = :value",
                                                {value: courseDto.coachId ? courseDto.coachId: null}
                                            )
                                            .orWhere(
                                                "course.maxSlot = :value",
                                                {value: courseDto.maxSlot ? courseDto.coachId : null}
                                            )
                                            .orWhere(
                                                "course.level = :value",
                                                {value: courseDto.level ? courseDto.level : null}
                                            )
                                            .orWhere(
                                                "course.status = :value",
                                                {value: courseDto.status ? courseDto.status : null}
                                            )
                                            .orWhere(
                                                "course.title = :value",
                                                {value: courseDto.title ? courseDto.status : null}
                                            )
                                            .skip(courseDto.windowIndex)
                                            .take(MAX_NUMBER_COURSE_LOAD)
                                            .getMany()
            
            const serializeCourse = plainToInstance(CourseEntity, listCourse)

            return {meta: {code: 200, msg: 'success'}, data: {serializeCourse}}
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

    async deleteCourse(courseId: GetID){
        try{
            const course = await this.courseRepo.delete({
                id: courseId.id
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

    async createScheduler(createScheduler: CreateSchedulerDTO){
        try{
            const scheduler = await this.courseSchedulerRepo.create(createScheduler)

            await this.courseSchedulerRepo.save(scheduler)
            
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

    async deleteScheduler(schedulerId: GetID){
        try{
            const scheduler = await this.courseSchedulerRepo.delete({
                id: schedulerId.id,
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