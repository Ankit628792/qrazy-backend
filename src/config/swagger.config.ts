
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle('My API')
        .setDescription('API documentation')
        .setVersion('1.0')
        .addTag('APIs')
        .addBearerAuth()
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger-ui', app, documentFactory);
}