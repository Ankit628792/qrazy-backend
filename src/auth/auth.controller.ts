import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDTO } from '@admin/dto/create-admin.dto';
import { LoginDTO } from './dto/login.dto';
import { Public } from '@common/guard/auth.guard';
import { AuthRequest } from 'src/types/global';
import { UpdateAdminDTO } from '@admin/dto/update-admin.dto';
import { ForgotPasswordDTO, ResetPasswordDTO, UpdatePasswordDTO } from '@admin/dto/update-password.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiRoute } from '@common/decorator/swagger.decorator';

@ApiBearerAuth()
@ApiTags('Admin Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('register')
    @ApiRoute({
        summary: 'Register Admin',
        status: 201,
        description: 'Registered successfully'
    })
    async register(@Body() createAdminDTO: CreateAdminDTO) {
        return this.authService.register(createAdminDTO);
    }

    @Get('verify/:token')
    @ApiRoute({
        summary: 'Verify Email',
        description: 'Email verified successfully'
    })
    async verifyMail(@Param('token') token: string) {
        return this.authService.verifyEmail(token);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiRoute({
        summary: 'Login Admin',
        description: 'Logged in successfully'
    })
    async login(@Body() loginDTO: LoginDTO) {
        return this.authService.login(loginDTO);
    }

    @Get('logout')
    @ApiRoute({
        summary: 'Logout Admin',
        description: 'Logged out successfully'
    })
    async logout() {
        return this.authService.logout();
    }

    @Get()
    @ApiRoute({
        summary: 'Verify Token & Get Base Profile',
        description: 'Profile retrieved successfully'
    })
    async getProfile(@Req() request: AuthRequest) {
        const id = request.id;
        return this.authService.getProfile(id);
    }

    @Patch()
    @ApiRoute({
        summary: 'Update Profile',
        description: 'Profile updated successfully'
    })
    async updateProfile(@Req() request: AuthRequest, @Body() profileDTO: UpdateAdminDTO) {
        return this.authService.updateProfile(request.id, profileDTO);
    }

    @Patch('password')
    @ApiRoute({
        summary: 'Update Password',
        description: 'Password updated successfully'
    })
    async updatePassword(@Req() request: AuthRequest, @Body() passwordDTO: UpdatePasswordDTO) {
        return this.authService.updatePassword(request.id, passwordDTO);
    }

    @Public()
    @Post('password/forgot')
    @ApiRoute({
        summary: 'Forgot Password',
        description: 'Password reset link sent to registered mail'
    })
    async forgotPassword(@Body() body: ForgotPasswordDTO) {
        return this.authService.forgotPassword(body.email);
    }

    @Public()
    @Patch('password/:token')
    @ApiRoute({
        summary: 'Reset Password',
        description: 'Password reset successfully'
    })
    async resetPassword(@Param('token') token: string, @Body() body: ResetPasswordDTO) {
        return this.authService.resetPassword(token, body);
    }
}
