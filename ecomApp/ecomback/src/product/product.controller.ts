import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('bulk')
  async createMany(@Body() products: Product[]) {
    return this.productService.createMany(products);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('category')
  @UseGuards(AuthGuard)
  async getProductsByCategory(@Query('category') category: string) {
    if (category) {
      return this.productService.getProductsByCategory(category);
    } else {
      return this.productService.findAll();
    }
  }
}
