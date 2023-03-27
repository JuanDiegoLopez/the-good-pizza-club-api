import { IsNumber, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  discount: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  sizeId: number;
}
