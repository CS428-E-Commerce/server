import { Controller, Module } from "@nestjs/common";
import { CoachController } from "./coach.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachEntity } from "@Entites/coach.entity";
import { UserEntity } from "@Entites/user.entity";
import { CoachService } from "./coach.service";

@Module({
    imports: [TypeOrmModule.forFeature([CoachEntity, UserEntity])],
    controllers: [CoachController],
    providers: [CoachService]
})
export class CoachModule{

}