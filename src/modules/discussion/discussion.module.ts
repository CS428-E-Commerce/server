import { Controller, Module } from "@nestjs/common";
import { CoachEntity, CourseCalendarEntity, CourseEntity } from "@Entites/index.ts";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscussionController } from "./discussion.controller";
import { DiscussionService } from "./discussion.service";
import { CourseDiscussion } from "src/entities/discussion.entity";

@Module({
    imports: [TypeOrmModule.forFeature([CourseDiscussion]),
            TypeOrmModule.forFeature([CourseCalendarEntity]),
            TypeOrmModule.forFeature([CoachEntity]),
        ],
    controllers: [DiscussionController],
    providers: [DiscussionService],
})
export class DiscussionModule{

}