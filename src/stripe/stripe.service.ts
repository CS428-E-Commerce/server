import { CoachEntity, CourseEntity } from '@Entites/index.ts';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Stripe from 'stripe';
import { Repository } from 'typeorm';


@Injectable()
export class StripeService {
  private stripeClient: Stripe;
  private SECRET_KEY = 'sk_test_51NaE1pH6fBgGoCwayTpBmBzzMXCurrHJDO3wejM69DvSESANB3wFWnK8zKbqpZuko393UipLoxs6fmkPSO4hTdCo00SmyrDKbn'

  constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                @InjectRepository(CoachEntity) private coachRepo: Repository<CoachEntity>) {
    this.stripeClient = new Stripe(this.SECRET_KEY, {
      apiVersion: '2022-11-15', // Replace with the desired API version
    });
  }

  async createPaymentIntent(courseId: number) {
    try {
        // Find course price with Id
        const course = await this.courseRepo.findOne({
            select: {
                cost: true,
            },
            where: {
                id: courseId,
            }
        })

        const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount: Number(course.cost),
            currency: 'usd',
        });

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: paymentIntent};;
    }
    catch(error){
        console.error('Error in creating payment intent:', error);
        throw error;
    }
  }

  async transferFundsToSeller( coachId: number, courseId: number ){
    try {
        // Find coach transaction Id
        const coachAccountId = await this.coachRepo.findOne({
            select: {

            },
            where: {
                id: coachId,
            }
        })

        // Find course price with Id
        const course = await this.courseRepo.findOne({
            select: {
                cost: true,
            },
            where: {
                id: courseId,
            }
        })
        
        // Create a Transfer to send funds to the seller's bank account
        await this.stripeClient.transfers.create({
            amount: Math.round(Number(course.cost) * 0.95), // Only send 95% of course cost to coach
            currency: 'usd',
            destination: coachAccountId.stripeId, // The seller's Stripe Connect account ID
        });

        return {meta: {code: HttpStatus.OK, msg: 'success'}, data: {}};
    } catch (error) {
        console.error('Error transferring funds:', error);
        throw error;
    }
  }

}
