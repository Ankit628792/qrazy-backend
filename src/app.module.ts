import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, DatabaseModule, CommonModule, AdminModule, RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
