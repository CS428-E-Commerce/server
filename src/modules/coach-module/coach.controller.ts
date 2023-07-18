import { Body, Controller, Post } from "@nestjs/common";
import { CoachService } from "./coach.service";
import { CoachDTO } from "./dto";

@Controller('coach')
export class CoachController{
    constructor(private coachService: CoachService){}

    @Post('profile')
    async getProfile(@Body() CoachID:string){
        //TODO: GET RANDOM COURSE (MAX NUMBER OF COURSE DEFINED)
        const coach__ = await this.coachService.findOne(CoachID);
        return coach__
    }

    @Post('login')
    async getProfileFromLogin(@Body() username:string,
                            @Body() pwd: string){
                                
    }

    @Post('newcoach')
    createCoach(@Body() coachDto: CoachDTO){
        this.coachService.create(coachDto);
    }
}