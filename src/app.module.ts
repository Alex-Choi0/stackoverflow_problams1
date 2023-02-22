import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // env파일 스키마 점검
      validationSchema: Joi.object({
        MONGODB_CONNECTION: Joi.required(),
        NEST_PORT: Joi.number().default(3000),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
