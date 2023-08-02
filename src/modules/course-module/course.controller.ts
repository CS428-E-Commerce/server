import { Body, Controller, Get, Post, Query, Put, Param, UseGuards } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDTO, CreateSchedulerDTO, UpdateCourseDTO } from "./dto";
import { FindCourseDTO, GetID, FindScheduler } from "./dto/find-course.dto";
import { AuthGuard, RolesGuard } from '../../auth';

@Controller('api/courses')
export class CourseController{
    constructor(private courseService: CourseService){}

    @UseGuards(AuthGuard)
    @Post()
    async createCourse(@Body() courseDto: CreateCourseDTO){
        return this.courseService.createCourse(courseDto)
    }

    @UseGuards(AuthGuard)
    @Put('update')
    async updateCourse(@Body() courseDto: UpdateCourseDTO){
        return this.courseService.updateCourse(courseDto);
    }

    @Get()
    async findCourse(@Query() findCourseDTO: FindCourseDTO){
        return this.courseService.findCourse(findCourseDTO)
    }

    @Get('detail/:id/:userid')
    async findDetail(@Param('id') id: number, @Param('userid') userid: string){
        return this.courseService.findCourseWithId(id, userid)
    }

    @UseGuards(AuthGuard)
    @Post('delete')
    async deleteCourse(@Body() getCourseID: GetID){
        return this.courseService.deleteCourse(getCourseID)
    }

    @UseGuards(AuthGuard)
    @Post('schedule')
    async createScheduler(@Body() createScheduler: CreateSchedulerDTO){
        return this.courseService.createScheduler(createScheduler);
    }

    @Get('schedule')
    async findScheduler(@Query() scheduler: FindScheduler){
        return this.courseService.findScheduler(scheduler)
    }

    @UseGuards(AuthGuard)
    @Post('schedule/delete')
    async deleteScheduler(@Body() schedulerID: GetID){
        return this.courseService.deleteScheduler(schedulerID)
    }
}