import {IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {

    @ApiProperty({
        description: "User nickname",
    })
    @IsString()
    @Length(2, 15)
    public username: string;

    @ApiProperty({
        description: "User age",
    })
    @IsNumber()
    @IsInt()
    public age: number;

    @ApiProperty({
        description: "User status",
        required: false,
    })
    @IsBoolean()
    @IsOptional()
    public status: boolean;
}
