import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from 'src/Db/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: USER_MODEL, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [MongooseModule],
})
export class AuthModule {}
