// payment.controller.ts
import { Controller, Get, Body, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('api/payment')
export class PaymentController {
    constructor(private readonly stripeService: StripeService) {}

    @Get('/:id')
    async createPaymentIntent( @Param("id") courseId: number ) {
        return await this.stripeService.createPaymentIntent( courseId );
    }

    @Post('transferToSeller')
    async transferFundsToSeller( @Body() courseId: number, @Body() coachId: number) {
        return await this.stripeService.transferFundsToSeller( coachId, courseId );
    }
}
