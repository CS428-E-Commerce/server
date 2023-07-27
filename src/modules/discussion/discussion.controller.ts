import { Body, Controller, Get, Post, Query, Put } from "@nestjs/common";
import { DiscussionService } from "./discussion.service";

@Controller('api/discussion')
export class DiscussionController{
    constructor(private commentService: DiscussionService){}

   
}