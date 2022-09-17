import {IsBoolean, IsEmail, IsInt, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description: 'User nickname',
    })
    @IsString()
    @Length(2, 15)
    public username: string;

    @ApiProperty({
        description: 'User email',
    })
    @IsString()
    @IsEmail()
    public email: string;

    @ApiProperty({
        description: 'User age',
        minimum: 1
    })
    @IsInt()
    public age: number;

    @ApiProperty({
        description: 'User status',
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    public status: boolean;

    @ApiProperty({
        description: "User password",
    })
    @IsString()
    @Length(4, 15)
    public password: string;
}
