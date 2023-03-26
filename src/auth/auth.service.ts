import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private jwt: JwtService,
    private config: ConfigService,){}

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    console.log("a")
    const user = await this.userRepo.createUser(createAuthDto)
    console.log('b')
    return user; //'This action adds a new auth';
  }

  async login(createAuthDto: CreateAuthDto): Promise<{access_token: string}>{
    const {password, username} = createAuthDto
    let user = await this.userRepo.findOne({
      where: {
        username,
      },
    });
    if(user &&(bcrypt.compare(password, user.password) )){
      return this.signToken(user.id, user.username)
    } else {
      throw new UnauthorizedException('please check your login credentials');
    }
    return
  }

  async signToken(
    userId: string,
    username: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      username,
    };
    const secret = this.config.get('jWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });
    return {
      access_token: token,
    };
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
