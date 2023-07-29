import { CoachEntity, CourseAttendeeEntity } from "@Entites/index.ts";
import { HttpStatus, Injectable } from "@nestjs/common";
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
  ) {}

  async createAttendee(createAttendeeDTO: CreateAttendeeDTO){
    const attendee = this.attendeeRepository.create(createAttendeeDTO);

    await this.attendeeRepository.save(attendee);

    return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}}
  }

  async getAttendeeByCourseId(courseId: number) {
    const attendee = await this.attendeeRepository.find({
                        where: {
                            courseId: courseId
                        }
                    });

    const attendee_serialize = plainToInstance(AttendeeSerialize, attendee)

    return attendee_serialize
  }

  async deleteAttendee(id: number) {
    await this.attendeeRepository.delete(id);

    return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}}
  }
}