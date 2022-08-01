import {Body, Controller, Post, UseGuards} from '@nestjs/common';

import {AuthService} from "./auth.service";
import {LoginUser} from "../user/dto/loginUser.dto";
import {CreateUserDto} from "../user/dto/createUser.dto";
import {GuardRefreshToken} from "./refreshTokenGuard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')
    login(@Body() userToLogin: LoginUser) {
        return this.authService.login(userToLogin);
    }

    @Post('/registration')
    register(@Body() userToRegister: CreateUserDto) {
        return this.authService.register(userToRegister);
    }

    @Post('/resetTokens')
    @UseGuards(GuardRefreshToken)
    resetTokens(@Body() email: {email: string}) {
        return this.authService.resetTokens(email);
    }
}
