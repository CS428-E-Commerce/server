import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDiscussionDTO, FindDiscussionsDTO } from "./dto/discussion.dto";
import { plainToInstance } from "class-transformer";
import { CourseDiscussion } from "@Entites/index.ts";
import { DiscussionSerialize } from "@Serialize/index.ts";

@Injectable()
export class DiscussionService{
    constructor(@InjectRepository(CourseDiscussion) private courseDiscussion: Repository<CourseDiscussion>,
                ){}

    async createDiscussion(createDiscussionDTO: CreateDiscussionDTO) {
        try {
            await this.courseDiscussion.save(createDiscussionDTO);
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}}
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
    
    async updateDiscussion(createDiscussionDTO: CreateDiscussionDTO) {
        try {
            const { userId, courseId } = createDiscussionDTO;
            const discussion = await this.courseDiscussion.findOne({
                where: {
                    userId: userId,
                    courseId: courseId,
                }
            });
        
            if (!discussion) {
                throw new NotFoundException('Discussion not found.');
            }
        
            await this.courseDiscussion.update({ userId, courseId }, createDiscussionDTO);
            return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}};
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
    
    async findDiscussions(findDiscussionsDTO: FindDiscussionsDTO) {
        const { courseId, offset, limit } = findDiscussionsDTO;
    
        const discussions = await this.courseDiscussion.find({
            where: { courseId },
            skip: offset,
            take: limit,
        });
    
        const discussion_serialize = plainToInstance(DiscussionSerialize, discussions)

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: discussion_serialize};
    }
    
    async deleteDiscussion(discussionId: number) {
        try {
            const discussion = await this.courseDiscussion.findOne({
                where: {
                    id: discussionId
                }
            });
        
            if (!discussion) {
                throw new NotFoundException('Discussion not found.');
            }
        
            await this.courseDiscussion.remove(discussion);
            return  {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}};
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }

}