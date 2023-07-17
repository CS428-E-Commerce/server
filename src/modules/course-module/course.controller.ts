import { Body, Controller, Post } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "./dto";
import { FindCourseDTO, GetCourse } from "./dto/find-course.dto";

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('updateCourse')
    async updateCourse(@Body() courseDto: CreateCourseDTO){
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
}