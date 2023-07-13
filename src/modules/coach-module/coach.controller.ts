import { CoachEntity } from "@Entites/coach.entity";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('courses')
export class CoachController{
    @Post('all')
    getProfile(@Body() CoachID:string):CoachEntity{
        //TODO: GET RANDOM COURSE (MAX NUMBER OF COURSE DEFINED)
        return null;
    }
}