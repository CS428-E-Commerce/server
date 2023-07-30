import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { CoachEntity, CourseDiscussion, CourseEntity } from "@Entites/index.ts";

@Module({
    imports: [TypeOrmModule.forFeature([CourseDiscussion, CoachEntity, CourseEntity]),
        ],
    controllers: [DiscussionController],
    providers: [DiscussionService],
})
export class DiscussionModule{

}