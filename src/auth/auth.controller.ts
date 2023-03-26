import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { createResponse, HttpStatusCode, ResponseStatus } from 'src/utils/apiResponse';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import { JwtGuard } from './guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() createAuthDto: CreateAuthDto, @Res() res: Response): Promise<User> {
    let response = await  this.authService.create(createAuthDto);
    return createResponse(
      res,
      HttpStatusCode.StatusCreated,
      ResponseStatus.Success,
      response
    )
  }

  
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  login(@Body() createAuthDto: CreateAuthDto): Promise<{ access_token: string }>{
    return this.login(createAuthDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('/me')
  @UseGuards(JwtGuard)
  me(@Req() req: Request , @GetUser() user: User) {
    // console.log(req);

    return user;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
