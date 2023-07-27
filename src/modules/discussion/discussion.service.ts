import { CourseEntity, UserEntity } from "@Entites/index.ts";
import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseDiscussion } from "src/entities/discussion.entity";
import { IsNull, Not, Repository } from "typeorm";
import { CreateDiscussionDTO, FindDiscussionsDTO } from "./dto/discussion.dto";
import { plainToInstance } from "class-transformer";
import { DiscussionSerialize } from "src/serialize/discussion.serialize";

@Injectable()
export class DiscussionService{
    constructor(@InjectRepository(CourseDiscussion) private courseDiscussion: Repository<CourseDiscussion>,
                @InjectRepository(CourseEntity) private courseEntity: Repository<CourseEntity>,
                @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
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
        const { courseId, startIndex } = findDiscussionsDTO;
    
        const discussions = await this.courseDiscussion.find({
            where: { courseId },
            skip: startIndex,
        });
    
        const discussion_serialize = plainToInstance(DiscussionSerialize, discussions)

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: discussion_serialize};
    }
    
    async deleteDiscussion(discussionId: number): Promise<boolean> {
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
            return true;
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