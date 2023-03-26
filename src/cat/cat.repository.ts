// /* eslint-disable prettier/prettier */
// import { ConflictException, InternalServerErrorException } from '@nestjs/common';
// import { EntityRepository, Repository } from 'typeorm';
// import { CreateCatDto } from './dto/create-cat.dto';
// import { Cat } from './entities/cat.entity';
// import * as bcrypt from 'bcrypt';
// import { CustomRepository } from 'src/database/typeorm-ex.decorator';
// import { InjectRepository } from '@nestjs/typeorm';

// // @CustomRepository(Photo)
// // export class PhotoRepository extends Repository<Photo> {
// //     public async getAllPhoto() {
// //         const query = this.createQueryBuilder('photo')
// //             .where('photo.isPublished = :isPublished', { isPublished: true })
// //         const photos = await query.getMany()
// //         return photos
// //     }
// // }
// @CustomRepository(Cat)
// export class CatRepository extends Repository<Cat> {
  
//     async createCat(createCatDto : CreateCatDto): Promise<Cat> {
//         try {
//             const { name, age, breed, tags } = createCatDto;
//             console.log("daso")
//             const Cat = this.create({name, age,breed,tags})
//             console.log("daso1")
//             await this.save(Cat);
//             return Cat;
//         } catch (error: any) {
//             if(error.code === '23505'){
//                 throw new ConflictException("Catname already exist")
//             }
//             console.log(error.code)
//             throw new InternalServerErrorException 
//         }
        
//     }
// }
