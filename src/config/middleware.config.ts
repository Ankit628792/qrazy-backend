import { AllExceptionFilter } from "@common/exception/all-exception.filter";
import { ResponseInterceptor } from "@common/interceptor/response.interceptor";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser'

export function initializeMiddlewares(app: INestApplication): void {
    app.setGlobalPrefix("api/v1");
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose'])
    app.useGlobalFilters(new AllExceptionFilter())
}