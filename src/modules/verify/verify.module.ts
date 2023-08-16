import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { CourseEntity, CourseCalendarEntity, CoachEntity, CoachCertificateEntity, CoachSkillEntity, CourseAttendeeEntity, UserEntity } from '@Entites/index.ts';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [VerifyController],
  providers: [VerifyService],
  imports: [TypeOrmModule.forFeature([CourseEntity, CoachEntity, UserEntity]),
        ],
})
export class VerifyModule {}
