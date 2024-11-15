import { diskStorage } from 'multer';

export const imageStorageConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const timestamp = Date.now();
            const originalName = file.originalname.split('.')[0];
            const fileExtension = file.mimetype.split('/')[1];
            const formattedName = `${originalName}-${timestamp}.${fileExtension}`;
            callback(null, formattedName);
        },
    }),
};

export const fileStorageConfig = {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
            const timestamp = Date.now();
            const originalName = file.originalname.split('.')[0];
            const fileExtension = file.mimetype.split('/')[1];
            const formattedName = `${originalName}-${timestamp}.${fileExtension}`;
            callback(null, formattedName);
        },
    }),
};

