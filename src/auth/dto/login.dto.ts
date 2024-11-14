import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginDTO {
    @ApiProperty({ example: "member@gmail.com" })
    @IsEmail({}, { message: "Email is not valid" })
    email: string;

    @ApiProperty({ example: "12345678" })
    @IsNotEmpty()
    @IsString()
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password: string;
}