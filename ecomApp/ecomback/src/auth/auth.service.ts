import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { USER_MODEL, UserDocument } from 'src/Db/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
// import { ValidationError } from 'class-validator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { signInUserdto } from './dto/signInUser.dto';

@Injectable()
export class AuthService {
  // constructor(private prisma: PrismaService) {}
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    // console.log(userModel);
  }
  async createUser(createUserDto: createUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userModel.create({
      ...createUserDto,
      password: hash,
    });
    if (!user) {
      throw new ForbiddenException(`Usernot found`);
    }
    const payload = { sub: user.id, email: createUserDto.email };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
    return {
      access_token,
    };
  }

  //   async signin(dto: signInUserdto, res: Response) {
  //     const user = await this.userModel.findOne({
  //       email: dto?.email,
  //     });

  //     if (!user) {
  //       throw new UnauthorizedException('invalid credentials');
  //     }

  //     // compare passed password with password inside the user model present inside the database
  //     // using bcrypt.compare function
  //     const hash = await bcrypt.compare(dto?.password, user.password);
  //     if (!hash) {
  //       throw new UnauthorizedException();
  //     }
  //     const payload = { sub: user?._id, email: user?.email };
  //     const access_token = await this.jwtService.signAsync(payload, {
  //       secret: this.config.get('JWT_SECRET'),
  //     });

  //     res.cookie('access_token', access_token, {
  //       httpOnly: true,
  //       secure: true,
  //     });
  //     return {
  //       access_token,
  //     };
  //   }
  // }

  async signin(dto: signInUserdto, res: Response) {
    const user = await this.userModel.findOne({
      email: dto?.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto?.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user?._id, email: user?.email };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: '1h',
    });

    // Set the cookie with access token
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({
      message: 'Login successful',
      access_token,
    });
  }

  // logic for '/home' request
}
