import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';

// Constants
import { ROLE_USER } from '@Constants/index.ts';

// Guards
import { AuthGuard, RolesGuard } from '../../auth';

// Service
import { UserService } from './user.service';

// Decorators
import { Roles, UserInfo } from '@Decorators/index.ts';
// DtO
import { GetUserDto, UpdateUserDto } from './dto';

@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(ROLE_USER.COACH, ROLE_USER.STUDENT)
    @Get('/')
    getDetail(@UserInfo() userInfo: GetUserDto) {
        return this.userService.getDetailUser(userInfo);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(ROLE_USER.COACH, ROLE_USER.STUDENT)
    @Put('/')
    update(@Body() updateUserDto: UpdateUserDto, @UserInfo() userInfo: GetUserDto) {
        return this.userService.updateUser(updateUserDto, userInfo);
    }
}
