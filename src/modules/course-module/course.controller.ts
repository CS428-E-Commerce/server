import { CourseEntity } from "@Entites/course.entity";
import { Body, Controller, Post } from "@nestjs/common";
import { Int32, MixedList } from "typeorm";

@Controller('courses')
export class CourseController{
    @Post()
    getCourse(@Body() available:boolean=true):MixedList<CourseEntity>{
        //TODO: GET RANDOM COURSE (MAX NUMBER OF COURSE DEFINED)
        return []
    }

    // @Post()
    // getCourseWithLevel(@Body() level:Int32, available:boolean=true):MixedList<CourseEntity>{
    //     //TODO: GET COURSE WITH LEVEL (MAX NUMBER OF COURSE DEFINED)
    //     return []
    // }

    // @Post()
    // getCourseWithCoachID(@Body() coachID:string, available:boolean=true):MixedList<CourseEntity>{
    //     //TODO: GET COURSE WITH ID OF COACH (MAX NUMBER OF COURSE DEFINED)
    //     return []
    // }
}