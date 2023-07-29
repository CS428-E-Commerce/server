import { Body, Controller, Param, Post, Get, Delete } from "@nestjs/common";
import { AttendeeService } from "./attendee.service";
import { CourseAttendeeEntity } from "@Entites/index.ts";
import { CreateAttendeeDTO } from "./dto/attendee.dto";

@Controller('api/attendees')
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) {}

    @Post()
    createAttendee(@Body() createAttendeeDTO: CreateAttendeeDTO) {
        return this.attendeeService.createAttendee(createAttendeeDTO);
    }

    @Get(':courseId')
    getAttendeeById(@Param('courseId') courseId: number) {
        return this.attendeeService.getAttendeeByCourseId(courseId);
    }

    @Delete(':id')
    deleteAttendee(@Param('id') id: number) {
        return this.attendeeService.deleteAttendee(id);
    }
}