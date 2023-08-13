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
            const { userId, courseId, rate, comment } = createDiscussionDTO;
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
                    select: { coachId: true},
                    where: { id: courseId }
                })

                // Get the coach
                const coach = await this.coachEntity.findOne({
                    where: { id: coachId.id }
                })

                const nRateTurn = Number(coach.rateTurn) + 1
                const nTotalRate = (Number(coach.totalRate) * Number(coach.rateTurn) + Number(createDiscussionDTO.rate)) / nRateTurn
                
                coach.totalRate = nTotalRate
                coach.rateTurn = nRateTurn
                coach.totalComment = nRateTurn //Update coach rate

                await this.coachEntity.save(coach)
                return {meta: {code: HttpStatus.OK, msg: 'Add new review successfully'}, data: {}}
            }
        
            // If it existed, update information of discussion and coach

            // Find the coach Id
            const coachId = await this.courseEntity.findOne({
                select: { coachId: true },
                where: { id: courseId }
            })

            // Get the coach
            const coach = await this.coachEntity.findOne({
                where: {id: coachId.coachId}
            })

            // Update coach + discussion
            const preRate = Number(discussion.rate)
            discussion.comment = createDiscussionDTO.comment
            discussion.rate = Number(createDiscussionDTO.rate)
            coach.totalRate = (Number(coach.totalRate)*Number(coach.rateTurn) + Number(createDiscussionDTO.rate) - preRate) / Number(coach.rateTurn)
            
            // Submit change of coach and discussion
            await this.coachEntity.save(coach)
            await this.courseDiscussion.save(discussion)

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
            coach.totalRate = (Number(coach.totalRate) * Number(coach.rateTurn) - Number(discussion.rate)) / (Number(coach.rateTurn) - 1)
            coach.rateTurn = Number(coach.rateTurn) - 1
        
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