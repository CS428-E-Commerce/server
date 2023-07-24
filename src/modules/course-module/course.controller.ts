import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetID, FindScheduler } from "./dto/find-course.dto";

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('create')
    async createCourse(@Body() courseDto: CreateCourseDTO){
        return this.courseService.createCourse(courseDto)
    }

    @Post('update')
    async updateCourse(@Body() courseDto: UpdateCourseDTO){
        return this.courseService.updateCourse(courseDto);
    }

    @Get('/')
    async findCourse(@Query() findCourseDTO: FindCourseDTO){
        return this.courseService.findCourse(findCourseDTO)
    }

    @Post('delete')
    async deleteCourse(@Body() getCourseID: GetID){
        return this.courseService.deleteCourse(getCourseID)
    }

    @Post('schedule/create')
    async createScheduler(@Body() createScheduler: CreateSchedulerDTO){
        return this.courseService.createScheduler(createScheduler);
    }

    @Get('schedule')
    async findScheduler(@Query() scheduler: FindScheduler){
        return this.courseService.findScheduler(scheduler)
    }

    @Post('scedule/delete')
    async deleteScheduler(@Body() schedulerID: GetID){
        return this.courseService.deleteScheduler(schedulerID)
    }
}