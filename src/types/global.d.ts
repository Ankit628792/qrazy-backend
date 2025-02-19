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

export enum ORDER_STATUS {
    "PENDING" = "PENDING",
    "RECEIVED" = "RECEIVED"
}

export enum QR_Type {
    "DIGITAL" = "DIGITAL",
    "PHYSICAL" = "PHYSICAL"
}

export enum QR_STATUS {
    "ACTIVE" = "ACTIVE",
    "EXPIRED" = "EXPIRED",
    "USED" = "USED"
}