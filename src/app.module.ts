import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }),
    MongooseModule.forRoot(process.env.MONGO_URL),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//I88HBVhDHoeNewvT

// mongodb+srv://dasodavid:<password>@youkay.mxctl7i.mongodb.net/?retryWrites=true&w=majority
