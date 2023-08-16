import { Controller, Post, Body } from '@nestjs/common';
import { VerifyService } from './verify.service';

@Controller('api/verify')
export class VerifyController {
  constructor(private readonly verifyService: VerifyService) {}

  @Post()
  async verifyCourse(
    @Body('courseId') courseId: number,
    @Body('verificationCode') verificationCode: string,
  ) {
    return await this.verifyService.verifyCourse(courseId, verificationCode);
  }
}
