import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Public } from '@common/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { ApiRoute } from '@common/decorator/swagger.decorator';
import { MultipleFileUploadDTO, MultipleImageUploadDTO, SingleFileUploadDTO, SingleImageUploadDTO } from './upload.dto';
import { fileStorageConfig, imageStorageConfig } from 'src/config/file.config';
import { FileParsePipe, ImageParsePipe } from '@common/pipe/file-parse.pipe';

const Single = {
    message: "File uploaded successfully",
    data: "https://cdn.dribbble.com/userupload/15638743/file/original-699823c804d22c95391670d300f106f2.jpg"
}

const Multiple = {
    message: "File uploaded successfully",
    data: [
        "https://cdn.dribbble.com/userupload/15638743/file/original-699823c804d22c95391670d300f106f2.jpg",
        "https://cdn.dribbble.com/userupload/15638743/file/original-699823c804d22c95391670d300f106f2.jpg",
        "https://cdn.dribbble.com/userupload/15638743/file/original-699823c804d22c95391670d300f106f2.jpg"
    ]
}

@Public()
@Controller('upload')
export class UploadController {
    @Post('image')
    @ApiConsumes('multipart/form-data')
    @ApiRoute({
        summary: "Upload Image",
        description: "Uploaded successfully",
    })
    @ApiResponse({ example: Single })
    @UseInterceptors(FileInterceptor('image', imageStorageConfig))
    uploadImage(
        @UploadedFile(ImageParsePipe) image: Express.Multer.File,
        @Body() body: SingleImageUploadDTO
    ) {
        return { ...Single, image };
    }

    @Post('images')
    @ApiConsumes('multipart/form-data')
    @ApiRoute({
        summary: "Upload Multiple Images",
        description: "Uploaded successfully",
    })
    @ApiResponse({ example: Multiple })
    @UseInterceptors(FileInterceptor('images', imageStorageConfig))
    uploadImages(
        @UploadedFile(ImageParsePipe) images: Express.Multer.File,
        @Body() body: MultipleImageUploadDTO
    ) {
        return { ...Multiple, images };
    }

    @Post('file')
    @ApiConsumes('multipart/form-data')
    @ApiRoute({
        summary: "Upload File",
        description: "Uploaded successfully",
    })
    @ApiResponse({ example: Single })
    @UseInterceptors(FileInterceptor('file', fileStorageConfig))
    uploadPDF(
        @UploadedFile(FileParsePipe) file: Express.Multer.File,
        @Body() body: SingleFileUploadDTO
    ) {
        return { ...Single, file };
    }

    @Post('files')
    @ApiConsumes('multipart/form-data')
    @ApiRoute({
        summary: "Upload Multiple Files",
        description: "Uploaded successfully",
    })
    @ApiResponse({ example: Multiple })
    @UseInterceptors(FileInterceptor('files', fileStorageConfig))
    uploadFiles(
        @UploadedFile(FileParsePipe) files: Express.Multer.File,
        @Body() body: MultipleFileUploadDTO
    ) {
        return { ...Multiple, files };
    }
}
