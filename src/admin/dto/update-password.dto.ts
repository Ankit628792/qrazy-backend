import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdatePasswordDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}

export class ResetPasswordDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ForgotPasswordDTO {
    @ApiProperty({ example: "ankit628792@gmail.com" })
    @IsNotEmpty()
    @IsEmail({}, { message: "Email is not valid" })
    email: string;
}