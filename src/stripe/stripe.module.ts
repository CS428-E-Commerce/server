// payment.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachEntity, CourseEntity } from '@Entites/index.ts';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity]),
            TypeOrmModule.forFeature([CoachEntity]),
        ],
  controllers: [PaymentController],
  providers: [StripeService],
})
export class PaymentModule {}
