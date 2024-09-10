import { Module } from '@nestjs/common';
import { UserController, AlbumContainer, PersonId } from './users.controller';

@Module({
  controllers: [UserController, AlbumContainer, PersonId],
})
export class AppModule {}
