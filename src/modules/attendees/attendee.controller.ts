import { Body, Controller, Param, Post, Get, Delete, UseGuards, Query } from "@nestjs/common";
import { AttendeeService } from "./attendee.service";
import { CreateAttendeeDTO } from "./dto/attendee.dto";
import { AuthGuard } from "../../auth";
import { FindDiscussionsDTO } from "../discussion/dto/discussion.dto";

@Controller('api/attendees')
export class AttendeeController {
    constructor(private readonly attendeeService: AttendeeService) {}

    @UseGuards(AuthGuard)
    @Post()
    createAttendee(@Body() createAttendeeDTO: CreateAttendeeDTO) {
        return this.attendeeService.createAttendee(createAttendeeDTO);
    }

    @Get()
    getAttendeeById(@Query() findDTO: FindDiscussionsDTO ) {
        return this.attendeeService.getAttendeeByCourseId(findDTO);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deleteAttendee(@Param('id') id: number) {
        return this.attendeeService.deleteAttendee(id);
    }
}