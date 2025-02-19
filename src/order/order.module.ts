import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { AdminModule } from '@admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), AdminModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule { }
