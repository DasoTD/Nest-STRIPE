import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { CatRepository } from './cat.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CatService {
 constructor(
  @InjectModel(Cat.name)
  private CatRepo: Model<Cat>
 ){}

  //  catRepository = connection.getRepository(Cat)
  // const user = new User();
  //   user.firstName = createUserDto.firstName;
  //   user.lastName = createUserDto.lastName;

  //   return this.usersRepository.save(user);

  async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.CatRepo(createCatDto);
    return createdCat.save();
  }

  // async addCat(createCatDto: CreateCatDto): Promise<Cat> {
  //   const cat = new Cat()
  //   cat.age = createCatDto.age
  //   cat.breed = createCatDto.breed
  //   cat.name = createCatDto.name
  //   cat.tags = createCatDto.tags

  //   return this.catRepo.save(cat);
  //   const {name, breed,age, tags} = createCatDto
  //   const createCat =  this.catRepo.create({
  //     name,
  //     breed,
  //     age,
  //     tags
  //   });
  //   await this.catRepo.save(createCat)
  //   return createCat
  // }

  findAll(): Promise <Cat[]> {
    return //this.catRepo.find();
  }

  async findOne(id) {
    const cat = await this.CatRepo.findOne(id)
    if(!cat){
      throw new NotFoundException(`Task with ID ${id} not found`)
    }
    return cat; // `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
