import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { CourseDiscussion } from "@Entites/index.ts";

@Module({
    imports: [TypeOrmModule.forFeature([CourseDiscussion]),
        ],
    controllers: [DiscussionController],
    providers: [DiscussionService],
})
export class DiscussionModule{

}