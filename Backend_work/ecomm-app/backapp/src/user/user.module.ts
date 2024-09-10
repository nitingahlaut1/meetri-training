import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
})
export class UserModule {}
