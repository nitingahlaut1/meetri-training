import {
  CanActivate,
  ExecutionContext,
  Injectable,
  PayloadTooLargeException,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { USER_MODEL, UserDocument } from 'src/Db/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request } from 'express';
import { error } from 'console';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = this.getTokenFromHeader(request);
    if (!request.cookies.access_token) {
      throw error('Invalid token');
    } else {
      const token = request.cookies.access_token;
      const payload = this.jwt.verify(token, {
        secret: this.config.get('JWT_SECRET')
      });
    }
    // console.log(token);
    try {
      if (request.body.email === undefined || request.body.email === null) {
        throw new UnauthorizedException('invalid credentials');
      }
      const user = await this.userModel.findOne({
        email: request.body.email,
      });
      if (!user) {
        throw new UnauthorizedException('invalid credentials');
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  //   private getTokenFromHeader(@Req() req: Request) {
  //     console.log(req)
  //     return req.cookies || 'hello';
  //   }
}
