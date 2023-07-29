import { CourseAttendeeEntity } from "@Entites/index.ts";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendeeService } from "./attendee.service";
import { AttendeeController } from "./attendee.controller";

@Module({
    imports: [TypeOrmModule.forFeature([CourseAttendeeEntity])],
    controllers: [AttendeeController],
    providers: [AttendeeService],
  })
  export class AttendeeModule {}