import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// Controllers
import { UserController } from "./user.controller";
// Services
import { UserService } from "./user.service";

// Entities
import { CoachEntity, UserEntity } from "@Entites/index.ts";



@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity,CoachEntity]),
       
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
