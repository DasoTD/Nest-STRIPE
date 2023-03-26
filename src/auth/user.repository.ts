/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createAuthDto : CreateAuthDto): Promise<User> {
        try {
            const { username, password } = createAuthDto;
            console.log("ad")
            const salt = await bcrypt.genSalt()
            console.log(password, username)
            const hash = await bcrypt.hash(password, salt);
            console.log("daso")
            const user =  this.create({username, password: hash})
            console.log("daso")
            await this.save(user);
            return user;
        } catch (error: any) {
            if(error.code === '23505'){
                throw new ConflictException("username already exist")
            }
            console.log(error.code)
            throw new InternalServerErrorException 
        }
        
    }
}
