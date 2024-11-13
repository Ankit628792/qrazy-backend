import { PartialType } from "@nestjs/mapped-types";
import { CreateAdminDTO } from "./create-admin.dto";
import { IsNotEmpty, IsOptional, IsString, Length, Matches } from "class-validator";
import { Exclude } from "class-transformer";

export class UpdateAdminDTO extends PartialType(CreateAdminDTO) {

    @IsOptional()
    @IsString()
    @Matches(/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/, {
        message: "Image URL must be a valid URL"
    })
    image?: string;
}