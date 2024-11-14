import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { BaseCompanyDTO } from "./base-company.dto";

export class CreateCompanyDTO extends BaseCompanyDTO {

    @ApiProperty({ example: "contact@motherdairy.com" })
    @IsEmail()
    contactEmail: string;

    @ApiProperty({ example: "+919892......" })
    @IsNotEmpty()
    @IsString()
    @Length(9, 15)
    contactNumber: string;
}