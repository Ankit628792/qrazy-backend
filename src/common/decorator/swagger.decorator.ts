import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiSummary(summary: string) {
    return ApiOperation({ summary });
}

export function ApiSuccessResponse(status: number, description: string) {
    return ApiResponse({ status, description });
}

export function ApiErrorResponse(status: number, description: string) {
    return ApiResponse({ status, description });
}

export function ApiRoute({
    summary,
    status = 200,
    description,
    errors = []
}: {
    summary: string;
    status?: number;
    description?: string;
    errors?: { status: number; description: string }[];
}) {
    const decorators = [
        ApiSummary(summary),
        ApiSuccessResponse(status, description || 'Request was successful'),
        ...errors.map(error => ApiErrorResponse(error.status, error.description)),
    ];
    return applyDecorators(...decorators);
}
