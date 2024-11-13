import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAdminDTO {
    @IsEmail({}, { message: "Email is not valid" })
    email: string;

    @IsNotEmpty()
    @Length(1, 100, { message: "First Name is Required" })
    firstName: string;

    @IsNotEmpty()
    @Length(1, 100, { message: "Last Name is Required" })
    lastName: string;

    @IsNotEmpty()
    @IsString()
    // @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
    //     message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    // })
    @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
    password: string;
}