import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from 'src/Db/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ProductService } from 'src/product/product.service';
import { Product, ProductSchema } from 'src/product/product.schema';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, ProductService],
  exports: [MongooseModule],
})
export class AuthModule {}
