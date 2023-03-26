import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { configSchemaValidation } from './utils/config.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatModule } from './cat/cat.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { MyMiddleware } from './utils/request';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmExModule } from './database/typeorm-ex.module';
// import { UserRepository } from './auth/user.repository';
// import { CatRepository } from './cat/cat.repository';

@Module({
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    // validationSchema: configSchemaValidation
  }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    WinstonModule.forRoot({}),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => {
    //     const isProduction = configService.get('STAGE') === 'prod';
    //     return {
    //       ssl: isProduction,
    //       extra: {
    //         ssl: isProduction ? { rejectUnauthorized: false } : null,
    //       },
    //       type: 'postgres',
    //       logNotifications: true,
    //       autoLoadEntities: true,
    //       synchronize: true,
    //       host: configService.get('DB_HOST'),
    //       port: configService.get('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_DATABASE'),
    //     };
    //   },
    // }),
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      logNotifications: true,
      autoLoadEntities: true,
      synchronize: true,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    // TypeOrmExModule.forCustomRepository([UserRepository, CatRepository]),
    CatModule,
    UtilitiesModule,
    OrderModule,
    CartModule,
    UserModule,
    ProductModule,
    AuthModule,
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

