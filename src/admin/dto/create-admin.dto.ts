import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAdminDTO {

    @ApiProperty({ example: "Ankit" })
    @IsNotEmpty()
    @Length(1, 100, { message: "First Name is Required" })
    firstName: string;

    @ApiProperty({ example: "Kumar" })
    @IsNotEmpty()
    @Length(1, 100, { message: "Last Name is Required" })
    lastName: string;

    @ApiProperty()
    @IsEmail({}, { message: "Email is not valid" })
    email: string;


    @ApiProperty({ example: "" })
    @IsNotEmpty()
    @IsString()
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    //     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // })
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password: string;
}