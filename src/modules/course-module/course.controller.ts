import { Body, Controller, Post } from "@nestjs/common";
import { CourseEntity } from "src/entities/course.entity";
import { Int32, MixedList } from "typeorm";
import { CourseService } from "./course.service";
import { CreateCourseDTO } from "./dto";
import { FindCourseDTO } from "./dto/find-course.dto";

@Controller('courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @Post('new course')
    async registerNewCourse(courseDto: CreateCourseDTO){
        try{this.courseService.create(courseDto);}
        catch{
            Error('Fail to register this course');
        }
    }

    @Post('all')
    async getCourse(@Body() windowIndex: number, @Body() available:boolean=true):Promise<MixedList<CourseEntity>>{
        //TODO: GET RANDOM COURSE (MAX NUMBER OF COURSE DEFINED)
        const courses = await this.courseService.findSome(windowIndex);
        return courses
    }

    @Post('condition')
    async getCourseWithCondition(@Body() courseDto: FindCourseDTO):Promise<MixedList<CourseEntity>>{
        //TODO: GET COURSE WITH CONDITIONS IN COURSEDTO
        const courses = await this.courseService.findCustom(courseDto)
        return courses
    }

    @Post('coachid')
    async getCourseWithCoachID(@Body() coachID:number, available:boolean=true):Promise<MixedList<CourseEntity>>{
        //TODO: GET COURSE WITH ID OF COACH (MAX NUMBER OF COURSE DEFINED)
        const courses = await this.courseService.findSomeOfCoach(coachID)
        return courses
    }

    @Post('find with code')
    async getCourseWithCode(@Body() code: string, available:boolean=true):Promise<CourseEntity>{
        //TODO: GET COURSE WITH ID OF COACH (MAX NUMBER OF COURSE DEFINED)
        const courses = await this.courseService.findOne(code);
        return courses
    }
}