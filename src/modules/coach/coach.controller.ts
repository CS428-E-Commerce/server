import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { FilterCoachDto } from "./dto";

// Auth
import { AuthGuard, RolesGuard } from '../../auth';

// Service
import { CoachService } from "./coach.service";


@Controller('/api/coach')
export class CoachController{
    constructor(private _coachService: CoachService){}


    @UseGuards(AuthGuard)
    @Get('/')
    findAll(@Query() filterParams: FilterCoachDto ) {
        return this._coachService.findAll(filterParams);
    }
}