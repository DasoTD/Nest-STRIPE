import { IsNumber, IsString, Length, Matches } from 'class-validator';

export class CreateCatDto {
  @IsString()
  // @Length(4, 20)
  name: string;

  // @IsString()
  // @Length(8, 32)
  // // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n)(?=.*[A-Z])(?=.*[a-z]).*$/, {
  // //   message: 'password is too weak',
  // // })
  // password: string;

  @IsString()
  breed: string

  @IsNumber()
  age: number

  @IsString()
  tags: string
}

