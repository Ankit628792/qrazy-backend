import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { SuccessResponse } from 'src/types/global';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
    private readonly logger = new Logger(ResponseInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<T>) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const { method, url, ip, headers } = request;
        const userAgent = headers['user-agent'] || 'Unknown';
        const startTime = Date.now();

        this.logger.debug(`Incoming request: ${method} ${url} | IP: ${ip} | User-Agent: ${userAgent}`);

        return next.handle().pipe(
            map((data: any) => {
                let message = '';
                if (data?.message) {
                    message = data.message;
                    delete data.message;
                }
                const body: SuccessResponse = {
                    success: response.statusCode < 400,
                    statusCode: response.statusCode,
                    message,
                    data: Object.keys(data).length ? data : null,
                };

                if (data?.data) {
                    body.data = data.data;
                }
                else if (Object.keys(data).length) {
                    body.data = data;
                }
                else {
                    delete body.data;
                }

                return body
            }),
            tap(({ statusCode, data }) => {
                const endTime = Date.now();
                const duration = endTime - startTime;

                this.logger.debug(
                    `Response sent: ${method} ${url} | Status: ${statusCode} | Duration: ${duration}ms | IP: ${ip} | User-Agent: ${userAgent}`
                );

                if (statusCode >= 400) {
                    this.logger.error(`Error response: ${JSON.stringify(data)}`);
                }
            }),
            catchError((err) => {
                const endTime = Date.now();
                const duration = endTime - startTime;
                console.log(err)
                this.logger.error(
                    `Error occurred during request: ${method} ${url} | Status: ${err.status} | Duration: ${duration}ms | IP: ${ip} | User-Agent: ${userAgent} | Error: ${err.response?.message || err.message}`
                );

                return throwError(() => err);
            })
        );
    }
}
