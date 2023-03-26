import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import  { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  // @Prop({ type: Date, required: true })
  // time: Date;

  @Prop([String])
  tags: string[]

//   @Prop({ required: true })
//   Fname: string;


//     // inside the class definition
//    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
//    owner: Owner; //for multiple owner Owner[]

}

export const CatSchema = SchemaFactory.createForClass(Cat);

export class Auth {}
import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

// @Entity()
// export class Cat {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column({unique: true})
//     // @Unique()
//     name: string;

//     // @Column()
//     // firstname: string;

//     // @Column()
//     // lastname: string;

//     // @Column({unique: true})
//     // email: string;

//     @Column()
//     age: number;

//     @Column()
//     breed: string;


//     @Column()
//     tags: string;

//     // @Column()
//     // address: string;

//     // @Column()
//     // gender: string;

//     // @Column()
//     // profilePicture: string;

//     // @Column({unique: true})
//     // phoneNumber: string;

//     // @Column()
//     // lastLogin: Date;
// }

