import { CoachCertificateEntity, CoachEntity, CoachSkillEntity, CourseAttendeeEntity, CourseCalendarEntity, CourseEntity, UserEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, In, IsNull, Not, Repository } from "typeorm";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetID, FindScheduler } from "./dto/find-course.dto";
import { plainToInstance } from "class-transformer";
import { CourseSerialize, SchedulerSerialize } from "@Serialize/index.ts";
import { ESTATUS_COURSE } from "@Constants/index.ts";

@Injectable()
export class CourseService{
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CourseCalendarEntity) private courseSchedulerRepo: Repository<CourseCalendarEntity>,
                @InjectRepository(CoachEntity) private coachRepository: Repository<CoachEntity>,
                @InjectRepository(CoachSkillEntity) private coachSkillRepository: Repository<CoachSkillEntity>,
                @InjectRepository(CourseAttendeeEntity) private courseAttendee: Repository<CourseAttendeeEntity>,
                @InjectRepository(CoachCertificateEntity) private coachCertificateRepository: Repository<CoachCertificateEntity>,
                ){}
    async createCourse(coursedto: CreateCourseDTO){
        try{
            // Create new course
            const course = await this.courseRepo.create(coursedto)
            course.status = course.status ? course.status : ESTATUS_COURSE.AWAIT
            
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
            // Then update average cost of coach
            coach.averageCost = (coach.averageCost*(coach.totalCourse-1) + course.cost)/coach.totalCourse

            // Commit change to database
            await this.courseRepo.save(course);
            await this.coachRepository.save(coach);

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

            // Find coach of the course
            const coach = await this.coachRepository.findOne({
                where: {
                    id: course.coachId
                }
            })
            // Check if the coach exists
            if (!coach) {
                throw new HttpException(
                {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'Coach not found',
                },
                HttpStatus.NOT_FOUND,
                );
            }
            // Then update average cost of coach
            coach.averageCost = coach.averageCost - (course.cost - courseDto.cost)/coach.totalCourse

            // Update course with new data
            const updatedCourse = { ...course, ...courseDto };
            await this.courseRepo.save(updatedCourse);     
            await this.coachRepository.save(coach)       

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

    async findCourseWithId(Id: number, userId: string){
        try {
            // Check if userId in attendee of the course
            const attendeeInCourse = await this.courseAttendee.exist({
                where: {
                    courseId: Id,
                    userId: userId,
                }
            })

            // Query to find course from the database         
            const course = await this.courseRepo.findOne({
                select: {
                    id: true,
                    code: true,
                    title: true,
                    banner: true,
                    status: true,
                    level: true,
                    maxSlot: true,
                    cost: true,
                    description: true,
                    attendeeNumber: true,
                    zoomLink: attendeeInCourse,
                },
                where: {
                    id: Id
                }
            })

            // Find coach of course
            const coach = await this.coachRepository.findOne({
                select: {
                    id: true,
                    userId: true,
                    totalRate: true,
                    rateTurn: true,
                    totalStudent: true,
                    totalCourse: true,
                    totalComment: true,
                    yearExperience: true,
                    averageCost: true,
                },
                where: {
                    id: course.coachId
                }
            })

            // Find skills of coach
            const coach_skill = await this.coachSkillRepository.find({
                select: {
                    skill: true,
                },
                where: {
                    coachId: coach.id
                }
            })

            // Find certificate of coach
            const coach_cert = await this.coachCertificateRepository.find({
                select: {
                    certificate: true
                },
                where: {
                    coachId: coach.id
                }
            })

            // Find schedule of course
            const schedule = await this.courseSchedulerRepo.find({
                select: {
                    startTime: true,
                    endTime: true,
                },
                where: {
                    courseId: 2,
                }
            })

            return { meta: { code: HttpStatus.OK, msg: 'success' }, course, coach, coach_skill, coach_cert, schedule };
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
            const {code, coachId, userId, status, level, offset, limit} = courseDto

            // Query to find course from the database               
            const query = this.courseRepo
                        .createQueryBuilder('course')
                        .select("course.id", 'courseId')
                        .addSelect('course.coachId', 'coachId')
                        .addSelect('course.title', 'title')
                        .addSelect('course.banner', 'banner')
                        .addSelect('course.status', 'status')
                        .addSelect('course.level', 'level')
                        .addSelect('course.maxSlot', 'maxSlot')
                        .addSelect('course.cost', 'cost')
                        .addSelect('course.description', 'description')
                        .addSelect('course.attendeeNumber', 'attendeeNumber')

                        .addSelect('user.avatar', 'coachAvatar')
                        .addSelect('user.username', 'coachname')
                        
                        .addSelect('coach.totalRate / coach.rateTurn', 'coachRate')
                        .addSelect('coach.totalCourse', 'coachTotalCourse')

                        .addSelect('MIN(schedule."startTime")', 'startTime')

                        .innerJoin(CoachEntity, 'coach', 'course.coachId = coach.id')
                        .innerJoin(UserEntity, 'user', 'coach."userId" = user.id')
                        .leftJoin(CourseCalendarEntity, 'schedule', 'schedule."courseId" = course.id')

                        .groupBy('course.id, course."coachId", coach."totalCourse", coach.totalRate, coach.rateTurn, user.avatar, user.username')

            if (level) query.where('course.level = :level', { level })
            if (status) query.andWhere('course.status = :status', { status })
            if (code) query.andWhere('course.code = :code', { code })
            if (coachId) query.andWhere('coach.id = :id', { id: coachId });

            const listCourse = await query.limit(limit)
                                    .offset(offset)
                                    .getRawMany()

            // // Return data
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: listCourse}
        }
        catch(error){
            // handle the exception and return an appropriate response
            console.log(error)
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