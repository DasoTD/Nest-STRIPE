import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { configSchemaValidation } from './utils/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { MyMiddleware } from './utils/request';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    // validationSchema: configSchemaValidation
  }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WinstonModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URL,
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_DATABASE,
      ssl: true,
      "useNewUrlParser": true,
      // "synchronize": true,
      "logging": true,
      // "entities": ["src/entity/*.*"],
      autoLoadEntities: true,
      // Only enable this option if your application is in development,
      // otherwise use TypeORM migrations to sync entity schemas:
      // https://typeorm.io/#/migrations
      synchronize: true,
    }),
    CatModule,
    UtilitiesModule,
],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MyMiddleware)
      .forRoutes('*');
  }
}

