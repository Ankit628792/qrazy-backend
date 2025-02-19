import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';
import { QrService } from './qr.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QROrder } from './entity/qr-order.entity';
import { AdminModule } from '@admin/admin.module';

@Module({
  imports: [TypeOrmModule.forFeature([QROrder]), AdminModule],
  controllers: [QrController],
  providers: [QrService]
})
export class QrModule { }
