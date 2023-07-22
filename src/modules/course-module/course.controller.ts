import { Body, Controller, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetCourse, Scheduler } from "./dto/find-course.dto";

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('updateCourse')
    async updateCourse(@Body() courseDto: UpdateCourseDTO){
        return this.courseService.updateCourse(courseDto);
    }

    @Post('findCourse')
    async findCourse(@Body() findCourseDTO: FindCourseDTO){
        return this.courseService.findCourse(findCourseDTO)
    }

    @Post('deleteCourse')
    async deleteCourse(@Body() getCourse: GetCourse){
        return this.courseService.deleteCourse(getCourse)
    }

    @Post('updateScheduler')
    async updateScheduler(@Body() scheduler: CreateSchedulerDTO){
        return this.courseService.updateScheduler(scheduler);
    }

    @Post('findScheduler')
    async findScheduler(@Body() scheduler: Scheduler){
        return this.courseService.findScheduler(scheduler)
    }

    @Post('deleteScheduler')
    async deleteScheduler(@Body() scheduler: CreateSchedulerDTO){
        return this.courseService.deleteScheduler(scheduler)
    }
}