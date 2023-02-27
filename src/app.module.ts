import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { configSchemaValidation } from './utils/config.schema';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    // validationSchema: configSchemaValidation
  }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WinstonModule.forRoot({}),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

