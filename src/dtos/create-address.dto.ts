import { IsLatitude, IsLongitude, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
