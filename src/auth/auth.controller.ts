import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req } from "@nestjs/common";
import { CreateAdminDTO } from "@admin/dto/create-admin.dto";
import { AuthService } from "./auth.service";
import { LoginDTO } from "./dto/login.dto";
import { Public } from "@common/guard/auth.guard";
import { AuthRequest } from "@type/global";
import { UpdateAdminDTO } from "@admin/dto/update-admin.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Public()
    @Post("register")
    async register(@Body() createAdminDTO: CreateAdminDTO) {
        const admin = await this.authService.register(createAdminDTO)
        return {
            message: admin ? 'Registered successfully' : 'Failed to register',
        }
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO)
    }

    @Get("logout")
    async logout() {
        return this.authService.logout()
    }

    @Get()
    async getProfile(@Req() request: AuthRequest) {
        const id = request.id
        return this.authService.getProfile(id)
    }

    @Patch()
    async updateProfile(@Req() request: AuthRequest, @Body() profileDTO: UpdateAdminDTO) {
        return this.authService.updateProfile(request.id, profileDTO)
    }

}