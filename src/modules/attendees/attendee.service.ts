import { CoachEntity, CourseAttendeeEntity, CourseEntity, UserEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAttendeeDTO } from "./dto/attendee.dto";
import { plainToInstance } from "class-transformer";
import { AttendeeSerialize } from "@Serialize/index.ts";
import { FindDiscussionsDTO } from "../discussion/dto/discussion.dto";

@Injectable()
export class AttendeeService {
  constructor(
    @InjectRepository(CourseAttendeeEntity) private attendeeRepository: Repository<CourseAttendeeEntity>,
    @InjectRepository(CoachEntity) private coachEntity: Repository<CoachEntity>,
    @InjectRepository(CourseEntity) private courseEntity: Repository<CourseEntity>
  ) {}

  async createAttendee(createAttendeeDTO: CreateAttendeeDTO){
      try {
          const attendee = this.attendeeRepository.create(createAttendeeDTO);

          // Update course
          const course = await this.courseEntity.findOne({
            where: {
              id: createAttendeeDTO.courseId
            }
          })

          course.attendeeNumber += 1

          // Update coach
          const coach = await this.coachEntity.findOne({
            where: {
              id: course.coachId
            }
          })

          coach.totalStudent += 1

          await this.coachEntity.save(coach)
          await this.courseEntity.save(course);
          await this.attendeeRepository.save(attendee);

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

  async getAttendeeByCourseId(findDto: FindDiscussionsDTO) {
      try {
        const { courseId, offset, limit } = findDto
        const attendee = await this.attendeeRepository.createQueryBuilder('course_attendee')
                                    .select('course_attendee.id')
                                    .addSelect('course_attendee."userId"')
                                    .addSelect('course_attendee."courseId"')
                                    .addSelect('course_attendee."createdAt"')
                                    .addSelect('user.username')
                                    .addSelect('user.avatar')
                                    .where('course_attendee."courseId"=:id', {id: courseId})
                                    .leftJoin(UserEntity, 'user', 'user.id=course_attendee."userId"')
                                    .offset(offset)
                                    .limit(limit)
                                    .getRawMany()

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: attendee}
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

  async deleteAttendee(id: number) {
    try {
      await this.attendeeRepository.delete(id);

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
}