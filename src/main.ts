import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {logger} from './utils/logger';
import {
  NestjsWinstonLoggerService, 
  appendRequestIdToLogger, 
  appendIdToRequest, 
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger
 } from 'nestjs-winston-logger';
 import { format, transports } from "winston";
import { formatDate } from './utils/loggerMethod';
import { TransformInterceptor } from './transform.interceptor';

 const d = formatDate();
 const globalLogger = new NestjsWinstonLoggerService({
  format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.File({ filename: `logs/${d}error.log`, level: "error" }),
    new transports.File({filename: `logs/${d}info.log`, level: "info"}),
    new transports.File({ filename: `logs/${d}combined.log` }),
    new transports.Console(),
  ],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(globalLogger);
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger))
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger))
  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(process.env.APP_PORT || 5000);
}
bootstrap();
