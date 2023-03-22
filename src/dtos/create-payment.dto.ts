import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { CardTypes } from '../constants/global.constants';

export class CreatePaymentDto {
  @IsEnum(CardTypes)
  type: CardTypes;

  @IsString()
  bank: string;

  @IsString()
  @Length(16, 16)
  number: string;

  @IsString()
  name: string;

  @IsDateString()
  expiration: string;

  @IsNumber()
  securityCode: number;
}
