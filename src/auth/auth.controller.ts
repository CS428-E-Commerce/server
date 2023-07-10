import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";

// Service
import { AuthService } from "./auth.service";
import { LoginDto, SignUpDto } from "./dto";
import { AuthGuard } from "./guard";



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

    @UseGuards(AuthGuard)
    @Get('/')
    test(){
        return 'hgelo';
    }
}   