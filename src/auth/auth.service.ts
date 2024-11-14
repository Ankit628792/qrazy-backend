import { comparePassword } from "@common/util/crypto.util";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateAdminDTO } from "@admin/dto/create-admin.dto";
import { AdminService } from "@admin/admin.service";
import { LoginDTO } from "./dto/login.dto";
import { JWTService } from "@common/service/jwt.service";
import { UpdateAdminDTO } from "@admin/dto/update-admin.dto";
import { ResetPasswordDTO, UpdatePasswordDTO } from "@admin/dto/update-password.dto";
import { ApiCookieAuth } from "@nestjs/swagger";

@ApiCookieAuth()
@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JWTService
    ) { }

    async register(createAdminDTO: CreateAdminDTO) {
        const result = await this.adminService.create(createAdminDTO);
        const token = await this.jwtService.generateToken({ sub: result.id });
        // Send email with token

        return {
            message: "Registered successfully",
        }
    }


    async verifyEmail(token: string) {
        const payload = await this.jwtService.validateToken(token);
        if (!payload || !payload?.sub) {
            throw new UnauthorizedException('Invalid token: no payload');
        }
        const admin = await this.adminService.findById(payload.sub);
        if (!admin) {
            throw new NotFoundException('Invalid token: admin not found');
        }
        await this.adminService.update(admin.id, { verified: true })
        return {
            message: 'Email verified successfully'
        }
    }

    async login(data: LoginDTO) {
        const result = await this.validateAdmin(data);
        if (!result) {
            throw new UnauthorizedException('Invalid credentials');
        }
        if (!result.verified) {
            throw new UnauthorizedException('Email not verified');
        }
        return {
            message: "Logged in successfully",
            accessToken: await this.jwtService.generateToken({ sub: result.id })
        }
    }

    async validateAdmin(data: LoginDTO) {
        const admin = await this.adminService.findOne({ email: data.email });
        if (!admin) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await comparePassword(data.password, admin.password);
        if (!isMatch) {
            return null;
        }
        return admin;
    }

    async logout() {
        return true;
    }


    async getProfile(id: string) {
        const admin = await this.adminService.findById(id)
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        if (!admin.verified) {
            throw new UnauthorizedException('Email not verified');
        }
        return admin;
    }

    async updateProfile(id: string, data: UpdateAdminDTO) {
        return this.adminService.update(id, data)
    }

    async updatePassword(id: string, data: UpdatePasswordDTO) {
        await this.adminService.updatePassword(id, data)
        return {
            message: 'Password updated successfully'
        }
    }

    async forgotPassword(email: string) {
        const admin = await this.adminService.findOne({ email });
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        const token = await this.jwtService.generateToken({ sub: admin.id });
        // Send email with token


        return {
            message: 'Password reset link sent to registered mail'
        }
    }

    async resetPassword(token: string, data: ResetPasswordDTO) {
        const payload = await this.jwtService.validateToken(token);
        if (!payload || !payload?.sub) {
            throw new UnauthorizedException('Invalid token: no payload');
        }
        await this.adminService.savePassword({ id: payload.sub, password: data.password })
        return {
            message: 'Password reset successfully'
        }
    }
}
