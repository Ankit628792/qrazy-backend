import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@common/guard/auth.guard';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/health")
  healthCheck(): string {
    return this.appService.getHello();
  }

  @Get("/crash")
  crash(): never {
    throw new Error("This is a crash");
  }

}
