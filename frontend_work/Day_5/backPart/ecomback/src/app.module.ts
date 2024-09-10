import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './Db/schemas/user.schema';
import { MongooseConfigService } from './Db/mongoose-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
