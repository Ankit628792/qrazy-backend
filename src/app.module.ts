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
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule, DatabaseModule, CommonModule, AdminModule, RoleModule, ProductModule, CompanyModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
