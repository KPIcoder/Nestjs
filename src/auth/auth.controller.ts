import {Body, Controller, Post, UseGuards} from '@nestjs/common';

import {AuthService} from "./auth.service";
import {LoginUser} from "../user/dto/loginUser.dto";
import {CreateUserDto} from "../user/dto/createUser.dto";
import {GuardRefreshToken} from "./refreshTokenGuard";
import {User} from "@prisma/client";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {CustomNotFoundResponse, CustomOkResponse} from "../common/swagger/swagger.customResponses";
import {SWAGGER_EXAMPLE_NOT_FOUND, SWAGGER_EXAMPLE_USER} from "../common/swagger/swagger.examples";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/login')

    @ApiBody({type: LoginUser})
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    login(@Body() userToLogin: LoginUser): Promise<User> {
        return this.authService.login(userToLogin);
    }

    @Post('/registration')

    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    register(@Body() userToRegister: CreateUserDto): Promise<User> {
        return this.authService.register(userToRegister);
    }

    @Post('/resetTokens')

    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    @UseGuards(GuardRefreshToken)
    resetTokens(@Body() email: {email: string}): Promise<User> {
        return this.authService.resetTokens(email);
    }
}
