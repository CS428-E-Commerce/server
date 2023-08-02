import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { FilterCoachDto, UpdateCoachDto } from "./dto";

// Auth
import { AuthGuard, RolesGuard } from '../../auth';

// Service
import { CoachService } from "./coach.service";


@Controller('/api/coach')
export class CoachController{
    constructor(private _coachService: CoachService){}

    @Get('/')
    findAll(@Query() filterParams: FilterCoachDto ) {
        return this._coachService.findAll(filterParams);
    }

    @Get('/:id')
    getDetail(@Param("id") coachId: number) {
        return this._coachService.findOne(coachId);
    }


    @UseGuards(AuthGuard)
    @Put('/:id')
    updateCoach(@Param("id") coachId: number, @Body() updateCoachDto: UpdateCoachDto) {
        return this._coachService.updateCoach(coachId, updateCoachDto);
    }
}