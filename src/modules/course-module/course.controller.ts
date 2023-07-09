import { CourseEntity } from "@Entites/course.entity";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { Int32, MixedList } from "typeorm";

@Controller('courses')
export class CourseController{
    @Get()
    getCourse():MixedList<CourseEntity>{
        return []
    }

    @Post()
    getCourseWithLevel(@Body() level:Int32):MixedList<CourseEntity>{
        return []
    }

    @Post()
    getCourseWithCoachID(@Body() coachID:string):MixedList<CourseEntity>{
        return []
    }
}