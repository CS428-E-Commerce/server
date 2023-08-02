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
  
    @Get(':courseId/:offset/:limit')
    async findDiscussions(
      @Param('courseId') courseId: number,
      @Param('offset') offset: number,
      @Param('limit') limit: number,
    ) {
      const findDiscussionsDTO: FindDiscussionsDTO = { courseId, offset, limit };
      return await this.discussionService.findDiscussions(findDiscussionsDTO);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteDiscussion(@Param('id') id: number) {
      return await this.discussionService.deleteDiscussion(id);
    }
}