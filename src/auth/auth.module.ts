import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {PrismaService} from "../common/prisma.service";
import {UserService} from "../user/user.service";

@Module({
  imports: [JwtModule.register({secret: process.env.JWT_SECRET})],
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService]
})
export class AuthModule {}
