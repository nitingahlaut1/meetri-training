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
import { Product } from 'src/product/product.schema';
import { ProductService } from 'src/product/product.service';

@UseInterceptors(AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private readonly productService: ProductService,
  ) {}
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
    return 'oooooooooinoo';
  }

  @Post('bulk')
  async createMany(@Body() products: Product[]) {
    return this.productService.createMany(products);
  }
}
