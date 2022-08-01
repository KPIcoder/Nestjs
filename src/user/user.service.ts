import {Injectable} from '@nestjs/common';
import {User} from '@prisma/client';

import {PrismaService} from "../common/prisma.service";
import {CreateUserDto} from "./dto/createUser.dto";
import {UpdateUserDto} from "./dto/updateUser.dto";
import {ITokens} from "../auth/auth.interfaces";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    getAllUsers(): Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    getUserById(id: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where: {id}
        });
    }

    createUser(data: CreateUserDto): Promise<User> {
        data.email = data.email.trim().toLowerCase();
        return this.prismaService.user.create({data});
    }

    deleteUser(id: string): Promise<User> {
        return this.prismaService.user.delete({
            where: {id}
        });
    }

    updateUser(data: UpdateUserDto, id:string): Promise<User> {
        const {username, age, status} = data;

        return this.prismaService.user.update({
            where: {id},
            data: {username, age, status}
        })
    }

    getUserByEmail(email: string): Promise<User> {
        return this.prismaService.user.findFirst({
            where: {email}
        });
    }

    updateUserAuthTokens(email: string, tokens: ITokens): Promise<User> {
        const {accessToken, refreshToken} = tokens;
        return this.prismaService.user.update({
            where: {email},
            data: {
                    access_token: accessToken,
                    refresh_token: refreshToken
            }
        });
    }


}
