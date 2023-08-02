import { CoachEntity, CourseAttendeeEntity, CourseEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAttendeeDTO } from "./dto/attendee.dto";
import { plainToInstance } from "class-transformer";
import { AttendeeSerialize } from "@Serialize/index.ts";

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

  async getAttendeeByCourseId(courseId: number) {
      try {
        const attendee = await this.attendeeRepository.find({
                            where: {
                                courseId: courseId
                            }
                        });

        const attendee_serialize = plainToInstance(AttendeeSerialize, attendee)

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: attendee_serialize}
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