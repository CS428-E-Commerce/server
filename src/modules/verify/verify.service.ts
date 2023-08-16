import { CourseEntity } from '@Entites/index.ts';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyService {
    constructor(@InjectRepository(CourseEntity) private courseRepo: Repository<CourseEntity>,
                ){}

    async verifyCourse(courseId: number, verificationCode: string) {
        try {
            const course = await this.courseRepo.findOne({
                where: {
                    id: courseId
                }
            })

            course.status = verificationCode

            this.courseRepo.save(course)

            return { meta: { code: HttpStatus.OK, msg: 'success' }, data: {} };
        }
        catch(error){
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        message: 'Internal server error',
                    },
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
    }
}
