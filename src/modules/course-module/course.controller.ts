import { Body, Controller, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "./dto";
import { FindCourseDTO } from "./dto/find-course.dto";

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('registerNewCourse')
    async registerNewCourse(courseDto: CreateCourseDTO){
        return this.courseService.create(courseDto);
    }

    @Post('getCourse')
    async getCourse(@Body() windowIndex: number){
        return this.courseService.findSome(windowIndex)
    }

    @Post('getCourseWithCondition')
    async getCourseWithCondition(@Body() courseDto: FindCourseDTO){
        return this.courseService.findCustom(courseDto);
    }
}