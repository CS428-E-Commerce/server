import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

// Service
import { AuthService } from "./auth.service";
// Dto
import { ChangePasswordDTO, LoginDto, SignUpDto } from "./dto";
// Guard
import { AuthGuard, RolesGuard } from "./guard";
// Decorator
import { Roles, UserInfo } from "@Decorators/index.ts";

// Constants
import { EROLE_USER } from "@Constants/index.ts";
import { GetUserDto } from "../modules/user/dto";



@Controller('/api/auth')
export class AuthController {
    constructor(private _authService: AuthService){

    }

    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto){
        return this._authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto){
        return this._authService.signIn(loginDto);
    }

    @UseGuards(AuthGuard, RolesGuard)
    @Roles(EROLE_USER.COACH)
    @Get('/')
    test(){
        return 'hgelo';
    }

    @UseGuards(AuthGuard)
    @Post('/change-password')
    changePassword(@Body() changePasswordDto: ChangePasswordDTO, @UserInfo() userInfo: GetUserDto){
        return this._authService.changePassword(changePasswordDto, userInfo.email);
    }
}   