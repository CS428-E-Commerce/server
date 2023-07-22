import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetID, FindScheduler } from "./dto/find-course.dto";

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('createCourse')
    createCourse(@Body() courseDto: CreateCourseDTO){
        return this.courseService.createCourse(courseDto)
    }

    @Post('updateCourse')
    updateCourse(@Body() courseDto: UpdateCourseDTO){
        return this.courseService.updateCourse(courseDto);
    }

    @Post('findCourse')
    findCourse(@Query() FilterCourse: FindCourseDTO){
        return this.courseService.findCourse(FilterCourse)
    }

    @Post('deleteCourse')
    deleteCourse(@Body() getCourseID: GetID){
        return this.courseService.deleteCourse(getCourseID)
    }

    @Post('createScheduler')
    createScheduler(@Body() createScheduler: CreateSchedulerDTO){
        return this.courseService.createScheduler(createScheduler);
    }

    @Post('findScheduler')
    findScheduler(@Body() scheduler: FindScheduler){
        return this.courseService.findScheduler(scheduler)
    }

    @Post('deleteScheduler')
    deleteScheduler(@Body() schedulerID: GetID){
        return this.courseService.deleteScheduler(schedulerID)
    }
}