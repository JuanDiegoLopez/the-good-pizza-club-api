import { IsNumber, IsString } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsNumber()
  productId: number;
}
