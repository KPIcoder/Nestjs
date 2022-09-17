import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';
import {User} from '@prisma/client';

import {ITokens} from "./auth.interfaces";
import {CreateUserDto} from "../user/dto/createUser.dto";
import {UserService} from "../user/user.service";
import {LoginUser} from "../user/dto/loginUser.dto";
import {EmailService} from "../email/email.service";

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
                private userService: UserService,
                private emailService: EmailService) {}

    async register(user: CreateUserDto): Promise<User> {

        if(await this.checkIfUserRegistered(user.email))
            throw new UnauthorizedException({message: 'User already exists'})

        const hashedPassword = await bcrypt.hash(user.password, 7)
        user = {...user, password: hashedPassword,};

        await this.emailService.sendMail(user.email, user.username);

        return this.userService.createUser(user);
    }

    async login(userToLogin: LoginUser): Promise<User> {
        const {email, password} = userToLogin;

        if(!await this.checkIfUserRegistered(email))
            throw new UnauthorizedException({message: 'User is not registered'})

        const user = await this.userService.getUserByEmail(email);
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword)
            throw new UnauthorizedException({message: 'Wrong email or password'})

        const tokens = this.generateAuthTokens({email});
        return this.userService.updateUserAuthTokens(email, tokens);
    }

    async resetTokens(emailToCheck: {email:string}): Promise<User> {

        const {email} = emailToCheck;

        if(!await this.checkIfUserRegistered(email))
            throw new UnauthorizedException({message: 'User is not registered'})

        const tokens = this.generateAuthTokens({email});
        return this.userService.updateUserAuthTokens(email, tokens);
    }

    private generateAuthTokens(payload: any = {}): ITokens {
        const accessToken = this.jwtService.sign(payload, {expiresIn: '4h', secret: process.env.ACCESS_TOKEN_SECRET });
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '15d', secret:  process.env.REFRESH_TOKEN_SECRET});
        return {accessToken, refreshToken};
    }

    private async checkIfUserRegistered(email: string): Promise<boolean> {
        const registeredUser = await this.userService.getUserByEmail(email);
        return registeredUser !== null;
    }

}
