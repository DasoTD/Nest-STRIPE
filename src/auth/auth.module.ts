import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Jwtstrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Jwtstrategy]
})
export class AuthModule {}
