// Core
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
// Controllers
import { AppController } from './app.controller';
// Services
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
