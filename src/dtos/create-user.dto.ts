import {
  IsEmail,
  IsString,
  IsPhoneNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Role } from '../constants/global.constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEnum(Role)
  role: string;
}
