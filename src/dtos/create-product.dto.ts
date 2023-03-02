import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  price: number;

  @IsNumber()
  weight: number;

  @IsNumber()
  calories: number;
}
