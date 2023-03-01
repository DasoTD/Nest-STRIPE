import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { HydratedDocument } from 'mongoose';
import { CreateDateColumn } from 'typeorm';

// import { Owner } from '../owners/schemas/owner.schema';

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

