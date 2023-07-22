import { Controller, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Controller
import { CoachController } from "./coach.controller";

// Service
import { CoachService } from "./coach.service";

// Entities
import { CoachCertificateEntity, CoachEntity, CoachSkillEntity, UserEntity } from "@Entites/index.ts";

@Module({
    imports: [TypeOrmModule.forFeature([CoachEntity, UserEntity, CoachSkillEntity, CoachCertificateEntity])],
    controllers: [CoachController],
    providers: [CoachService]
})
export class CoachModule{}