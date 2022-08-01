import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';

import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {AuthGuard} from "../auth/jwtGuard";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    createUser(@Body() user: CreateUserDto) {
        return this.userService.createUser(user);
    }

    @Patch('/:id')
    updateUser(@Body() user: UpdateUserDto, @Param('id') id: string) {
        return this.userService.updateUser(user, id);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(id);
    }
}
