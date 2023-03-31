import { IsEnum, IsString } from 'class-validator';
import { CardTypes } from '../constants/global.constants';

export class CreatePaymentDto {
  @IsEnum(CardTypes)
  type: CardTypes;

  @IsString()
  number: string;

  @IsString()
  name: string;

  @IsString()
  expiration: string;

  @IsString()
  securityCode: string;
}
