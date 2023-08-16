import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
// Entities
import { CoachEntity, UserEntity } from "@Entites/index.ts";

// DTO
import { GetUserDto, UpdateUserDto } from "./dto";


// Serialize
import { CoachSerialize, UserSerialize } from "@Serialize/index.ts";
import { EROLE_USER } from "@Constants/index.ts";

export class UserService {
    constructor(
        @InjectRepository(UserEntity) private _userRepository: Repository<UserEntity>,
        @InjectRepository(CoachEntity) private _coachRepository: Repository<CoachEntity>,
    ) {}

    async getDetailUser(userInfo: GetUserDto) {
        try {
            const {email} = userInfo;

            const currentUser = await this._userRepository.findOneBy({
                email,
                deletedAt: IsNull()
            })

            const serializeUser = plainToInstance(UserSerialize, currentUser);
            
            if(currentUser.role === EROLE_USER.COACH){
                const coachInfo = await this._coachRepository.findOneBy({
                    userId: currentUser.id
                })

                const serialzeCoachInfo = plainToInstance(UserSerialize, {...serializeUser, coachInfo});

                return {meta: {code: 200, msg: 'success'}, data: serialzeCoachInfo}
            }

            return {meta: {code: 200, msg: 'success'}, data: serializeUser}

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

    async updateUser(updateUserDto: UpdateUserDto, userInfo: GetUserDto){
        try {
            const {email} = userInfo;

            const currentUser = await this._userRepository.findOneBy({
                email,
                deletedAt: IsNull()
            })

            currentUser.updateAttributes(updateUserDto);

            await this._userRepository.save(currentUser);

            const serializeUser = plainToInstance(UserSerialize, currentUser);

            return {meta: {code: 200, msg: 'success'}, data: serializeUser}

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