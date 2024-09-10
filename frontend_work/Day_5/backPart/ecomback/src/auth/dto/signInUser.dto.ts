import { IsEmail, IsString } from 'class-validator';

export class signInUserdto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
