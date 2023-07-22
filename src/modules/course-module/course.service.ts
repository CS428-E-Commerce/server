import { CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { MAX_NUMBER_COURSE_LOAD } from "@Constants/index.ts";
import { FindCourseDTO, GetCourse, Scheduler } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize, SchedulerSerialize } from "@Serialize/index.ts";
import { IsNotEmpty } from "class-validator";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseCalendarEntity) private courseSchedulerRepo: Repository<CourseCalendarEntity>,
                ){}

    async createCourse(courseDto: CreateCourseDTO){
        try{
            const queryBuilder = this.courseRepo.createQueryBuilder('course')

            queryBuilder.insert()
                        .into(CourseEntity)
                        .values(
                            [
                                courseDto,
                            ]
                        )
                        .execute()

            return {meta: {code: 200, msg: 'success'}, data: {}}
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
            const queryBuilder = this.courseRepo.createQueryBuilder('course')
            const entityExistsForUpdate = await queryBuilder.select()
                        .from(CourseEntity, 'course')
                        .where("course.id = :id", {id:courseDto.id})
                        .getExists()

            if (entityExistsForUpdate){
                await queryBuilder.update(CourseEntity)
                            .set(courseDto)
                            .where("id=:id", {id: courseDto.id})
                            .execute()

                return {meta: {code: 200, msg: 'success'}, data: {}}
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

    async createScheduler(createScheduler: CreateCourseDTO){
        const scheduler = await this.courseSchedulerRepo.create(createScheduler)

        await this.courseSchedulerRepo.save(scheduler)
        
        const serializeScheduler = plainToInstance(SchedulerSerialize, scheduler)
        
        return {meta: {code: 200, msg: 'success'}, data: serializeScheduler}
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
                return {meta: {code: 404, msg: 'scheduler not found'}, data: {}}
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