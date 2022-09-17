import {IsEmail, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUser {

    @ApiProperty({
        description: "user email",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "user password",
    })
    @IsString()
    @Length(5, 16)
    password: string;
}
