import {IsEmail, IsString, Length} from "class-validator";

export class LoginUser {

    @IsEmail()
    email: string;

    @IsString()
    @Length(5, 16)
    password: string;
}
