import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from '@admin/admin.module';
import { AuthGuard } from '../common/guard/auth.guard';
import { JWTService } from '@common/service/jwt.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
    imports: [
        AdminModule,
    ],
    controllers: [AuthController],
    providers: [AuthService,
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        JWTService],
})
export class AuthModule { }
