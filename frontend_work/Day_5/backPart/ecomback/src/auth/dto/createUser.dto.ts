import { IsEmail, IsOptional, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  firstname: string;
  @IsOptional()
  lastname: string;
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
