import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";


export class BaseCompanyDTO {
    @ApiProperty({ example: "Mother Dairy" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({ example: "22AAAAA0000A1Z5" })
    @IsOptional()
    @IsString()
    gstNo: string;

    @ApiProperty({ example: "AAAAA0000A" })
    @IsOptional()
    @IsString()
    panNo: string;

    @ApiProperty({ example: "https://cdn.dribbble.com/userupload/15638743/file/original-699823c804d22c95391670d300f106f2.jpg" })
    @IsNotEmpty()
    @IsString()
    logo: string;

    @ApiProperty({ example: "https://www.motherdairy.com" })
    @IsNotEmpty()
    @IsString()
    website: string;

    @ApiProperty({ example: "Somewhere in New Delhi" })
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty({ example: "110076" })
    @IsNotEmpty()
    @IsString()
    @Length(5)
    pinCode: string;

    @ApiProperty({ example: "India" })
    @IsNotEmpty()
    @IsString()
    country: string;
}