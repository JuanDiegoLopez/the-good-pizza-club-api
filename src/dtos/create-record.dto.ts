import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RecordTypes } from '../constants/global.constants';

export class CreateRecordDto {
  @IsString()
  name: string;

  @IsEnum(RecordTypes)
  type: string;

  @IsNumber()
  price: number;
}
