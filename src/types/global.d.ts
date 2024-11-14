import { Request } from "express";

interface AuthRequest extends Request {
    id: string;
}

interface SuccessResponse {
    success: boolean;
    statusCode: number;
    message?: string;
    data?: any;
}

interface ErrorResponse {
    success: boolean,
    statusCode: number,
    error: boolean,
    method: string,
    path: string,
    timestamp: Date | string,
    message: string | string[];
    stack?: any
}