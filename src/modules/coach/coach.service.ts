import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

// Entities
import { CoachCertificateEntity, CoachEntity, CoachSkillEntity, CourseEntity, UserEntity } from '@Entites/index.ts';

// DTO
import { FilterCoachDto, UpdateCoachDto } from './dto';

// Serialize
import { CoachSerialize } from '@Serialize/index.ts';

@Injectable()
export class CoachService {
    constructor(
        @InjectRepository(CoachEntity) private _coachRepository: Repository<CoachEntity>,
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
        @InjectRepository(CoachSkillEntity) private _coachSkillRepository: Repository<CoachSkillEntity>,
        @InjectRepository(CoachCertificateEntity) private _coachCertificateRepository: Repository<CoachCertificateEntity>
    ) {}

    async findAll(filterParams: FilterCoachDto) {
        try {
            const { offset, limit, name, sortBy, direction } = filterParams;

            const queryBuilder = this._coachRepository.createQueryBuilder('coach');

            queryBuilder.leftJoinAndMapOne('coach.coachInfo', UserEntity, 'user', 'coach."userId" = user.id');

            queryBuilder.leftJoinAndMapMany('coach.certificates', CoachCertificateEntity, 'coach_certificate', 'coach."id" = coach_certificate.coachId')

            queryBuilder.leftJoinAndMapMany('coach.skills', CoachSkillEntity, 'coach_skill', 'coach."id" = coach_skill.coachId');
            
            if (name) {
                queryBuilder.andWhere('user.username LIKE :fullName', { fullName: `%${name}%` });
            }

            if(sortBy && direction){
                if(sortBy === 'totalRate') {
                    queryBuilder.addOrderBy(`coach.${sortBy}`, direction);   
                } else {
                    queryBuilder.addOrderBy(`user.${sortBy}`, direction);
                }
            }

            const totalRecords = await queryBuilder.getCount();
            const totalPage = Math.ceil(totalRecords / limit);

            const listCoach = await queryBuilder.skip(offset).take(limit).getMany();

            const serializeCoachInfo = plainToInstance(CoachSerialize, listCoach);


            return { meta: { code: 200, message: 'success', total: totalPage }, data: serializeCoachInfo };
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

    async findOne(coachId: number) {
        try {
            const existCoach = await this._coachRepository.findOneBy({
                id: coachId,
                deletedAt: IsNull()
            })

            if(!existCoach) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.CONFLICT,
                        message: 'Coach is not exist',
                    },
                    HttpStatus.CONFLICT
                );
            }

            const queryBuilder = this._coachRepository.createQueryBuilder('coach');

            queryBuilder.andWhere('coach.id = :coachId', {coachId: existCoach.id});

            queryBuilder.leftJoinAndMapOne('coach.coachInfo', UserEntity, 'user', 'coach."userId" = user.id');

            queryBuilder.leftJoinAndMapMany('coach.certificates', CoachCertificateEntity, 'coach_certificate', 'coach."id" = coach_certificate.coachId')

            queryBuilder.leftJoinAndMapMany('coach.skills', CoachSkillEntity, 'coach_skill', 'coach."id" = coach_skill.coachId');

            queryBuilder.leftJoinAndMapMany('coach.courses', CourseEntity, 'course', 'coach."id" = course.coachId');

            const coachFullInfo = await queryBuilder.getOne();

            const serializeCoachInfo = plainToInstance(CoachSerialize, coachFullInfo);

            return {meta: {code: 200, message: "Success"}, data: serializeCoachInfo}

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

    async updateCoach(coachId: number, updateCoachDto: UpdateCoachDto) {
        try {
            const existCoach = await this._coachRepository.findOneBy({
                id: coachId,
                deletedAt: IsNull()
            })

            if(!existCoach) {
                throw new HttpException(
                    {
                        statusCode: HttpStatus.CONFLICT,
                        message: 'Coach is not exist',
                    },
                    HttpStatus.CONFLICT
                );
            }
            const {skills, certificates, ...infoCoach } = updateCoachDto;

            const currentInfoUser = await this._userRepository.findOneBy({
                id: existCoach.userId,
                deletedAt: IsNull()
            })

            currentInfoUser.updateAttributes(infoCoach);
            await this._userRepository.save(currentInfoUser);

            // Update Skills
            if(updateCoachDto.skills && updateCoachDto.skills.length) {
                const listCoachSkills = await this._coachSkillRepository.find({
                    where: {
                        coachId: existCoach.id,
                        deletedAt: IsNull()
                    }
                })
                
                if(listCoachSkills && listCoachSkills.length) {
                    await this._coachSkillRepository.remove(listCoachSkills);
                }
    
                updateCoachDto.skills.forEach(async (skill) => {{
                    const newSkill = this._coachSkillRepository.create({
                        skill,
                        coachId: existCoach.id
                    })
                    await this._coachSkillRepository.save(newSkill);
                }})
            }
            

            // Update Certifcates
            if(updateCoachDto.certificates && updateCoachDto.certificates.length){
                const listCoachCertificates = await this._coachCertificateRepository.find({
                    where: {
                        coachId: existCoach.id,
                        deletedAt: IsNull()
                    }
                })
    
                await this._coachCertificateRepository.remove(listCoachCertificates);
    
                updateCoachDto.certificates.forEach(async (certificate) => {{
                    const newCerticate = this._coachCertificateRepository.create({
                        certificate,
                        coachId: existCoach.id
                    })
                    await this._coachCertificateRepository.save(newCerticate);
                }})
            }
            
            return { meta: {code: 200, message: 'Success'}, data: null}

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
}
