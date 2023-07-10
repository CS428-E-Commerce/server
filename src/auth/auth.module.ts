import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

// Controller
import { AuthController } from './auth.controller';
// Service
import { AuthService } from './auth.service';
// Entities
import { UserEntity,CoachEntity } from '@Entites/index.ts';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, CoachEntity]),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
