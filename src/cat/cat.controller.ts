import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Response } from 'express';
import { createResponse, HttpStatusCode, ResponseMessage, ResponseStatus } from 'src/utils/apiResponse';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  // adminResponseLogger(module).info(
  //   `createAdmin request by ${req.user.Username}: {users:${JSON.stringify(
  //     users
  //   )}, roleId: ${roleId}}`
  // );

  // return createAdminResponse(
  //   res,
  //   HttpStatusCode.StatusCreated,
  //   ResponseStatus.Success,
  //   response
  // );

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    // const {name, age, breed,tags} = createCatDto
   let response = await this.catService.createCat(createCatDto);
   return response;
    return createResponse(
      res,
      HttpStatusCode.StatusCreated,
      ResponseStatus.Success,
      response
    )
  }

  // try {
  //   let response = this.catService.create(createCatDto);
  //   return handleResponse(
  //     req,
  //     res,
  //     {
  //       response,
  //       // ResponseStatus.Success,
  //     },
  //     HttpStatusCode.StatusCreated,
      
  //   )
  //  } catch (error) {
  //   console.log(error.message)
  //  }
  // }


  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
