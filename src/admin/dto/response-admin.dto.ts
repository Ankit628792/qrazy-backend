
export class ResponseAdminDTO {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    company: string;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
}