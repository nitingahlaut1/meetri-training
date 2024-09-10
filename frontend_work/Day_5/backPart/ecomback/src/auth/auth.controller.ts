import {
  Body,
  Controller,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from './dto/createUser.dto';
import { signInUserdto } from './dto/signInUser.dto';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { Response } from 'express';

@UseInterceptors(AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('signup')
  createuser(@Body() dto: createUserDto) {
    return this.auth.createUser(dto);
  }
  @Post('signin')
  signin(@Body() dto: signInUserdto, @Res() res: Response) {
    return this.auth.signin(dto, res);
  }

  @Get('fake')
  @UseGuards(AuthGuard)
  fake() {
    return 'ooooooooooo';
  }
}
