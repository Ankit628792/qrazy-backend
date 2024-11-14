import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { AdminModule } from '@admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Company]), AdminModule],
  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule { }
