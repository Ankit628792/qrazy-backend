import { comparePassword } from "@common/util/crypto.util";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateAdminDTO } from "@admin/dto/create-admin.dto";
import { AdminService } from "@admin/admin.service";
import { LoginDTO } from "./dto/login.dto";
import { JWTService } from "@common/service/jwt.service";
import { UpdateAdminDTO } from "@admin/dto/update-admin.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly adminService: AdminService,
        private readonly jwtService: JWTService
    ) { }

    async register(createAdminDTO: CreateAdminDTO) {
        return this.adminService.create(createAdminDTO);
    }

    async login(data: LoginDTO) {
        const result = await this.validateAdmin(data);
        if (!result) {
            throw new UnauthorizedException('Invalid credentials');
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

    }

    async getProfile(id: string) {
        return await this.adminService.findById(id)
    }

    async updateProfile(id: string, data: UpdateAdminDTO) {
        return await this.adminService.update(id, data)
    }
}
