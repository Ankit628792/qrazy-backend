import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateCategoryDTO {

    @ApiProperty({ example: "Electronics" })
    @IsString()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: "" })
    description?: string;

    createdBy?: string;

}

export class UpdateCategoryDTO {
    @ApiProperty({ example: "Electronics" })
    @IsString()
    @MinLength(3)
    name?: string;

    @ApiProperty({ example: "" })
    description?: string;

    isPrivate?: boolean;
}

export class CategoryDTO extends UpdateCategoryDTO {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}


export class ResponseCategoryDTO {
    id: string;
    name: string;
    description?: string;
}

