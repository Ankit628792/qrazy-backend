import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class BaseProductDTO {

    @ApiProperty({ example: "Milk" })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ example: "https://example.com/product1.jpg" })
    @IsNotEmpty()
    @IsString()
    image: string;
}

export class CreateProductDTO extends BaseProductDTO {
    @ApiProperty()
    @IsOptional()
    @IsUUID()
    id?: string;

    @ApiProperty({ example: "A fresh, low-fat, and organic milk product." })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: 100 })
    @IsNumber()
    mrp: number;

    @ApiProperty({ example: 9 })
    @IsNumber()
    mrl: number;

    @ApiProperty({ example: ["https://example.com/product1.jpg", "https://example.com/product2.jpg"] })
    @IsNotEmpty()
    links: string[];

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    category: string;

    @ApiProperty({ example: "https://example.com/product1_thumbnail.jpg" })
    @IsNotEmpty()
    @IsString()
    thumbnail: string;

    @ApiProperty({ example: [{ url: "https://example.com/product1_image1.jpg", thumbnail: "https://example.com/product1_thumbnail1.jpg" }, { url: "https://example.com/product1_image2.jpg", thumbnail: "https://example.com/product1_thumbnail2.jpg" }] })
    @IsNotEmpty()
    images: { url: string, thumbnail: string }[];

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    draft: boolean;

}

export class DraftProductDTO extends PartialType(CreateProductDTO) {

}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {

}
