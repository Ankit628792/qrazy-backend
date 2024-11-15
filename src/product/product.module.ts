import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { AdminModule } from '@admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AdminModule],
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule { }
