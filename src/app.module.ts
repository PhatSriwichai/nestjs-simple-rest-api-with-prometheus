import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AopModule } from './aop/aop.module';

@Module({
  imports: [
    UserModule, 
    AopModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
