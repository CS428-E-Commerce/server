import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { CoachEntity, UserEntity } from '@Entites/index.ts';
import { FilterCoachDto } from './dto';

@Injectable()
export class CoachService {
    constructor(
        @InjectRepository(CoachEntity) private _coachRepository: Repository<CoachEntity>,
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>
    ) {}

    async findAll(filterParams: FilterCoachDto) {
        try {
            const { offset, limit, name } = filterParams;

            const queryBuilder = this._coachRepository.createQueryBuilder('coach');

            queryBuilder.leftJoinAndMapOne('coach.coachInfo', UserEntity, 'user', 'coach."userId" = user.id');

            if (name) {
                queryBuilder.andWhere('user.username LIKE :fullName', { fullName: `%${name}%` });
            }

            const listCoach = await queryBuilder.skip(offset).take(limit).getMany();

            return { meta: { code: 200, message: 'ok' }, data: listCoach };
        } catch (error) {
            // handle the exception and return an appropriate response
            if (error instanceof HttpException) {
                throw error;
            } else {
                console.log(error);

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

    findOne(id: string) {
        // return this.coachRepo.findOneBy({ coachID:id });
    }
}
