import { Controller, Module } from "@nestjs/common";
import { CoachController } from "./coach.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachService } from "./coach.service";
import { CoachEntity, UserEntity } from "@Entites/index.ts";

@Module({
    imports: [TypeOrmModule.forFeature([CoachEntity, UserEntity])],
    controllers: [CoachController],
    providers: [CoachService]
})
export class CoachModule{}