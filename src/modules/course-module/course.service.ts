import { CoachEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetID, FindScheduler } from "./dto/find-course.dto";
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
            // Create new course
            const course = await this.courseRepo.create(coursedto)
            
            const serializeCourse = plainToInstance(CourseSerialize, course)

            // Find coach of the course
            const coach = await this.coachRepository.findOne({
                where: {
                    id: course.coachId
                }
            })

            // Check is coach is existed or not
            if (!coach){
                throw new NotFoundException(
                    "Coach of this course is not found"
                )
            }

            // If coach is existed, update totalCourse of the coach
            coach.totalCourse += 1

            // Commit change to database
            await this.courseRepo.save(course)
            await this.courseRepo.save(coach);

            // Return data
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: serializeCourse}
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
            // Get the course by ID
            const course = await this.courseRepo.findOne({
                where: {
                    id: courseDto.id
                }
            });

            // Check if the given ID exists
            if (!course) {
                throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Course not found',
                },
                HttpStatus.NOT_FOUND,
                );
            }

            // Update course with new data
            const updatedCourse = { ...course, ...courseDto };
            await this.courseRepo.save(updatedCourse);

            // Return data if success
            return { meta: { code: HttpStatus.OK, msg: 'success' }, data: updatedCourse };
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
            // Get data from user's input
            const {code, coachId, status, level, offset, limit} = courseDto

            const queryBuilder = this.courseRepo.createQueryBuilder('course')

            // Query to find course from the database
            const listCourse = await queryBuilder.select()
                        .where(
                            { // And filter
                                level: level ? level : Not(IsNull()), // If level is not null => find course with level, if it is null, ignore the level
                                status: status ? status : Not(IsNull()),
                                code: code ? code : Not(IsNull()),
                                coachId: coachId ? coachId : Not(IsNull()),
                            }
                        )
                        .offset(offset)
                        .take(limit)
                        .getMany()
            
            // Return data
            const serializeCourses = plainToInstance(CourseSerialize, listCourse)
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: serializeCourses}
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
            // Delete the course with id
            // If the course is not existed => ignore
            const course = await this.courseRepo.delete({
                id: courseId.id
            })
            
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}}
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

    async findScheduler(courseSchedule: FindScheduler){
        try{
            // Get input from user
            const {courseId, startTime, offset, limit} = courseSchedule

            // Find schedule with courseId and start time
            const queryBuilder = this.courseRepo.createQueryBuilder('course_schedule')

            const listSchedule = await queryBuilder.select()
                        .where(
                            {
                                courseId: courseId, // must differ from null
                                startTime: startTime ? startTime : Not(IsNull()), // if startTime is null then find all startTimer != null, else, find with startTime
                            }
                        )
                        .offset(offset)
                        .take(limit)
                        .getMany()

            // Return data
            const serializeScheduler = plainToInstance(SchedulerSerialize, listSchedule)

            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: serializeScheduler}
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
            // Create new schedule with dto
            const scheduler = await this.courseSchedulerRepo.create(createScheduler)

            // Commit change
            await this.courseSchedulerRepo.save(scheduler)
            
            // Return data
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
            // Delete schedule with id if it is existed
            const scheduler = await this.courseSchedulerRepo.delete({
                id: schedulerId.id,
            })
            
            // Return if success
            return {meta: {code: 200, msg: 'success'}, data: {}}
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