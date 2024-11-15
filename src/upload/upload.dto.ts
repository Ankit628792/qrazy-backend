import { ApiProperty } from "@nestjs/swagger";

export class SingleImageUploadDTO {
    @ApiProperty({
        description: 'Single Image File < 10MB',
        format: 'binary',
        type: 'string',
    })
    image: Express.Multer.File;
}

export class SingleFileUploadDTO {
    @ApiProperty({
        description: 'Single File < 10MB',
        format: 'binary',
        type: 'string',
    })
    file: Express.Multer.File;
}

export class MultipleImageUploadDTO {
    @ApiProperty({
        description: 'Multiple Image File < 10MB',
        format: 'binary',
        type: 'string',
    })
    images: Express.Multer.File;
}

export class MultipleFileUploadDTO {
    @ApiProperty({
        description: 'Multiple File < 10MB',
        format: 'binary',
        type: 'string',
    })
    file: Express.Multer.File;
}