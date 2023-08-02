import { Body, Controller, Get, Post, Query, Put, Param, Delete, UseGuards } from "@nestjs/common";
import { DiscussionService } from "./discussion.service";
import { CreateDiscussionDTO, FindDiscussionsDTO } from "./dto/discussion.dto";
import { AuthGuard, RolesGuard } from '../../auth';

@Controller('api/discussion')
export class DiscussionController{
    constructor(private discussionService: DiscussionService){}

    @UseGuards(AuthGuard)
    @Post()
    async createDiscussion(@Body() createDiscussionDTO: CreateDiscussionDTO) {
      return await this.discussionService.updateDiscussion(createDiscussionDTO);
    }
  
    @UseGuards(AuthGuard)
    @Put('update')
    async updateDiscussion(@Body() createDiscussionDTO: CreateDiscussionDTO) {
      return await this.discussionService.updateDiscussion(createDiscussionDTO);
    }
  
    @Get()
    async findDiscussions( @Query() findDTO: FindDiscussionsDTO ) {
      return await this.discussionService.findDiscussions(findDTO);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteDiscussion(@Param('id') id: number) {
      return await this.discussionService.deleteDiscussion(id);
    }
}