import { CoachEntity } from "@Entites/coach.entity";
import { Body, Controller, Post } from "@nestjs/common";
import { Int32, MixedList } from "typeorm";

@Controller('courses')
export class CoachController{
    @Post('all')
    getProfile(@Body() CoachID:string):CoachEntity{
        //TODO: GET RANDOM COURSE (MAX NUMBER OF COURSE DEFINED)
        return null;
    }
}