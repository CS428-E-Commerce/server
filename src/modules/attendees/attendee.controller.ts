import { Body, Controller, Param, Post, Get, Delete, UseGuards } from "@nestjs/common";
import { AttendeeService } from "./attendee.service";
import { CreateAttendeeDTO } from "./dto/attendee.dto";
import { AuthGuard } from "../../auth";

@Controller('api/attendees')
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) {}

    @UseGuards(AuthGuard)
    @Post()
    createAttendee(@Body() createAttendeeDTO: CreateAttendeeDTO) {
        return this.attendeeService.createAttendee(createAttendeeDTO);
    }

    @Get(':courseId')
    getAttendeeById(@Param('courseId') courseId: number) {
        return this.attendeeService.getAttendeeByCourseId(courseId);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteAttendee(@Param('id') id: number) {
        return this.attendeeService.deleteAttendee(id);
    }
}