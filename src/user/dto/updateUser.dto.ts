import {IsBoolean, IsInt, IsNumber, IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto {

    @IsString()
    @Length(2, 15)
    public username: string;


    @IsNumber()
    @IsInt()
    public age: number;

    @IsBoolean()
    @IsOptional()
    public status: boolean;
}
