import { ApiProperty } from "@nestjs/swagger";
import { BaseCompanyDTO } from "./base-company.dto";
import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class UpdateCompanyDTO extends PartialType(BaseCompanyDTO) {

    @ApiProperty({ example: "contact@motherdairy.com" })
    @IsEmail()
    contactEmail: string;

    @ApiProperty({ example: "+919892......" })
    @IsNotEmpty()
    @IsString()
    @Length(9, 15)
    contactNumber: string;
}