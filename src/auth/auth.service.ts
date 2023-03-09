import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepo: UserRepository){}
  async create(createAuthDto: CreateAuthDto) {
    const {username, password} = createAuthDto
    const user =await this.userRepo.createUser(createAuthDto)
    return user; //'This action adds a new auth';
  }

  async findAll() {
    let users = await this.userRepo.findAndCount()
    return users; //`This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
