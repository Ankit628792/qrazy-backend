import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { AdminModule } from './admin/admin.module';
import { RoleModule } from './role/role.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CompanyModule } from './company/company.module';
import { CategoryModule } from './category/category.module';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from './upload/upload.module';
import { OrderModule } from './order/order.module';
import { QrModule } from './qr/qr.module';
@Module({
  imports: [
    ConfigModule.forRoot(),

    MulterModule.register(),

    AuthModule, DatabaseModule, CommonModule, AdminModule, RoleModule, ProductModule, CompanyModule, CategoryModule, UploadModule, OrderModule, QrModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
