import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDTO } from "./create-admin.dto";
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAdminDTO extends PartialType(CreateAdminDTO) {

    @ApiProperty({ example: "" })
    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/, {
        message: "Image URL must be a valid URL"
    })
    image?: string;

    @ApiProperty({ example: "Ankit" })
    @IsNotEmpty()
    @Length(1, 100, { message: "First Name is Required" })
    firstName?: string;

    @ApiProperty({ example: "Maurya" })
    @IsNotEmpty()
    @Length(1, 100, { message: "Last Name is Required" })
    lastName?: string;

    company?: string;

    verified?: boolean

}