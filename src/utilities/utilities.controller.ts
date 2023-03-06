import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { UtilitiesService } from './utilities.service';
import { CreateUtilityDto } from './dto/create-utility.dto';
import { UpdateUtilityDto } from './dto/update-utility.dto';
import encryptResponse, { encryptPayload, decryptRequest } from 'src/utils/encryption';
// import decryptRequest from '/src/utils/decryption';
import { Request, Response } from 'express';
// import decryptRequest from 'src/utils/decryption';
import Cypher from 'src/utils/cypher';

@Controller('utilities')
export class UtilitiesController {
  constructor(private readonly utilitiesService: UtilitiesService) {}

  @Post()
  create(@Body() createUtilityDto: CreateUtilityDto) {
    return this.utilitiesService.create(createUtilityDto);
  }

  // async findAll() {
  //   try {
  //     await this.service.findAll()
  //   } catch (error) { 
  //     throw new HttpException({
  //       status: HttpStatus.FORBIDDEN,
  //       error: 'This is a custom message',
  //     }, HttpStatus.FORBIDDEN, {
  //       cause: error
  //     });
  //   }

  @Post('encrypt')
  async encrypt(@Body() data: string, @Req() req: Request, @Res() res: Response){
    try {
      console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
      const encrypt = await encryptPayload(JSON.stringify(data));
      // const encrypt = await encryptResponse(JSON.stringify(data));
      return res.json(encrypt)
      
    } catch (error) {
      console.log(error)
      throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
    }
  }


  @Post('decrypt')
  async decrypt(@Body() data: string, @Res() res: Response, @Req() req:Request){
    try {
      console.log(`${req.originalUrl}`);
      const decrypted = await decryptRequest(req.body.data);
      return res.json(JSON.parse(decrypted));
      // const decrypt = await decryptRequest(JSON.stringify(data));
      // const json = JSON.stringify(decrypt);
      // return res.json(json);
      // return res.json(decrypt)
      
    } catch (error) {
      console.log(error)
      throw new HttpException({
              status: HttpStatus.FORBIDDEN,
              error: 'This is a custom message',
            }, HttpStatus.FORBIDDEN, {
              cause: error
            });
    }
  }


  @Get()
  findAll() {
    return this.utilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.utilitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUtilityDto: UpdateUtilityDto) {
    return this.utilitiesService.update(+id, updateUtilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.utilitiesService.remove(+id);
  }
}
