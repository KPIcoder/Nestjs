import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {ApiBody, ApiQuery, ApiTags} from "@nestjs/swagger";
import {User} from "@prisma/client";

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {AuthGuard} from "../auth/jwtGuard";
import {CustomNotFoundResponse, CustomOkResponse} from "../common/swagger/swagger.customResponses";
import {
    SWAGGER_EXAMPLE_GET_ALL_USERS,
    SWAGGER_EXAMPLE_NOT_FOUND,
    SWAGGER_EXAMPLE_USER
} from "../common/swagger/swagger.examples";


@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_GET_ALL_USERS })
    getUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    @UseGuards(AuthGuard)
    getUser(@Param('id') id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    @ApiBody({type: CreateUserDto})
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    createUser(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.createUser(user);
    }

    @Patch('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @ApiBody({type: UpdateUserDto})
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    updateUser(@Body() user: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUser(user, id);
    }

    @Delete('/:id')
    @ApiQuery({name: 'id', type: 'string'})
    @CustomOkResponse({ exampleData: SWAGGER_EXAMPLE_USER })
    @CustomNotFoundResponse({
        exampleData: SWAGGER_EXAMPLE_NOT_FOUND,
        description: "User not found"
    })
    deleteUser(@Param('id') id: string): Promise<User> {
        return this.userService.deleteUser(id);
    }
}
