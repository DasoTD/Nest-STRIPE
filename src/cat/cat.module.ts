import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/cat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { CatRepository } from './cat.repository';

@Module({
  imports: [MongooseModule.forFeature([{name: Cat.name, schema: CatSchema}])],
  // imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatController],
  providers: [CatService],
  // exports: [ TypeOrmModule]
})
export class CatModule {}
