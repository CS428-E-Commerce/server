import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDiscussionDTO, FindDiscussionsDTO } from "./dto/discussion.dto";
import { plainToInstance } from "class-transformer";
import { CoachEntity, CourseDiscussion, CourseEntity } from "@Entites/index.ts";
import { DiscussionSerialize } from "@Serialize/index.ts";

@Injectable()
export class DiscussionService{
    constructor(@InjectRepository(CourseDiscussion) private courseDiscussion: Repository<CourseDiscussion>,
                @InjectRepository(CoachEntity) private coachEntity: Repository<CoachEntity>,
                @InjectRepository(CourseEntity) private courseEntity: Repository<CourseEntity>,
                ){}
    
    async updateDiscussion(createDiscussionDTO: CreateDiscussionDTO) {
        try {
            const { userId, courseId } = createDiscussionDTO;
            const discussion = await this.courseDiscussion.findOne({
                where: {
                    userId: userId,
                    courseId: courseId,
                }
            });
        
            // If discussion is not existed, create new discussion
            if (!discussion) {
                await this.courseDiscussion.save(createDiscussionDTO);

                const coachId = await this.courseEntity.findOne({
                    select: { coachId: true, },
                    where: { id: courseId }
                })

                // Get the coach
                const coach = await this.coachEntity.findOne({
                    select: { totalComment: true, rateTurn: true },
                    where: { id: coachId.id }
                })

                this.coachEntity.update({id: coachId.id}, {totalRate: createDiscussionDTO.rate, rateTurn: coach.rateTurn + 1, totalComment: coach.totalComment + 1}) //Update coach rate

                return {meta: {code: HttpStatus.OK, msg: 'Add new review successfully'}, data: {}}
            }
        
            // If it existed, update information of discussion and coach
            await this.courseDiscussion.update({ userId, courseId }, createDiscussionDTO);

            // Find the discussion before modify
            const preDiscussion = await this.courseDiscussion.findOne({
                where: { userId, courseId }
            })

            // Find the coach Id
            const coachId = await this.courseEntity.findOne({
                select: { coachId: true },
                where: { id: courseId }
            })

            // Get the coach
            const coach = await this.coachEntity.findOne({
                where: {id: coachId.id}
            })

            // Update coach + discussion
            const preRate = preDiscussion.rate
            preDiscussion.comment = createDiscussionDTO.comment
            preDiscussion.rate = createDiscussionDTO.rate
            coach.totalRate = coach.totalRate + createDiscussionDTO.rate - preRate

            // Submit change of coach and discussion
            this.coachEntity.save(coach)
            this.courseDiscussion.save(preDiscussion)

            // Return data
            return {meta: {code: HttpStatus.OK, msg: 'Update the review successfully'}, data: {}};
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
            // Find the discussion that need to be deleted
            const discussion = await this.courseDiscussion.findOne({
                where: {
                    id: discussionId
                }
            });

            // If the discussion is not existed, throw error
            if (!discussion) {
                throw new NotFoundException('Discussion not found.');
            }

            // Find the coach need to be update
            const coachId = await this.courseEntity.findOne({
                select: { coachId: true },
                where: { id: discussion.courseId }
            })

            const coach = await this.coachEntity.findOne({
                where: {id: coachId.id}
            })

            // Update value of rate in coach
            coach.rateTurn -= 1
            coach.totalRate -= discussion.rate
        
            // Commit change to coach and discussion
            await this.coachEntity.save(coach)
            await this.courseDiscussion.remove(discussion);

            // Return data
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