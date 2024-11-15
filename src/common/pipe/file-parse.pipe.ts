import { Injectable, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

@Injectable()
export class ImageParsePipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
                new FileTypeValidator({ fileType: 'image/*' }),
            ],
        });
    }
}

@Injectable()
export class PDFParsePipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
                new FileTypeValidator({ fileType: /\.pdf$/i }),
            ],
        });
    }
}

@Injectable()
export class FileParsePipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
                new FileTypeValidator({ fileType: /\.pdf$/i }),
            ],
        });
    }
}
