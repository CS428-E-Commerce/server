import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {AES, enc} from 'crypto-js';
// DTO
import { LoginDto, SignUpDto } from './dto';

// Entities
import { UserEntity,CoachEntity } from '@Entites/index.ts';
import { EROLE_USER } from '@Constants/index.ts';

export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
        @InjectRepository(CoachEntity) private _coachRepository: Repository<CoachEntity>,

        private _jwtService: JwtService
    ) {}

    async checkExistUser(email: string) {
        const existUser = await this._userRepository.findOneBy({
            email: email,
            deletedAt: IsNull(),
        });

        if (existUser) {
            throw new HttpException(
                {
                    statusCode: HttpStatus.CONFLICT,
                    message: 'Email is existed',
                },
                HttpStatus.CONFLICT
            );
        }
    }

    async signUp(signUpDto: SignUpDto) {
        try {
            const { email, password, role } = signUpDto;

            await this.checkExistUser(email);

            const bytes = AES.decrypt(password, process.env.AUTH_SECRET);
            const originalPassword = bytes.toString(enc.Utf8);

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(originalPassword, salt);

            const user = this._userRepository.create({ email, password: hashPassword, role });

            user.setAttribute();

            if(role === EROLE_USER.COACH) {
                const newCoach = this._coachRepository.create({userId: user.id});
                await this._coachRepository.save(newCoach);
            }

            await this._userRepository.save(user);

            return await this.signIn({email, password});
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

    async signIn(loginDto: LoginDto) {
        try {
            const { email, password } = loginDto;

            const currentUser = await this._userRepository.findOneBy({
                email,
                deletedAt: IsNull(),
            });

            if (!currentUser) {
                console.error('invalid Email');
                throw new HttpException(
                    {
                        statusCode: HttpStatus.CONFLICT,
                        message: 'Invalid email or password',
                    },
                    HttpStatus.CONFLICT
                );
            }

            const bytes = AES.decrypt(password, process.env.AUTH_SECRET);
            const originalPassword = bytes.toString(enc.Utf8);

            const checkPassword = await bcrypt.compare(originalPassword, currentUser.password);

            if (!checkPassword) {
                console.error('invalid Password');
                throw new HttpException(
                    {
                        statusCode: HttpStatus.CONFLICT,
                        message: 'Invalid email or password',
                    },
                    HttpStatus.CONFLICT
                );
            }
            const payloadJwt = { email, role: currentUser.role };
       
            const accessToken: string = this._jwtService.sign(payloadJwt);

            return { meta: { code: 200, msg: 'success' }, data: { accessToken, email } };
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
