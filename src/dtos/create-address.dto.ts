import { IsLatitude, IsLongitude, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating new delivery addresses.
 * Validates address information including location coordinates
 * and descriptive details for pizza delivery purposes.
 * 
 * @class CreateAddressDto
 */
export class CreateAddressDto {
  /**
   * Friendly name for the address location.
   * Helps users identify the address easily (e.g., "Home", "Office").
   * 
   * @type {string}
   * @memberof CreateAddressDto
   */
  @IsString()
  name: string;

  /**
   * Detailed address description including street, building, and special instructions.
   * Used by delivery personnel to locate and deliver orders accurately.
   * 
   * @type {string}
   * @memberof CreateAddressDto
   */
  @IsString()
  description: string;

  /**
   * Latitude coordinate for the delivery location.
   * Must be a valid latitude value between -90 and 90 degrees.
   * 
   * @type {number}
   * @memberof CreateAddressDto
   */
  @IsLatitude()
  lat: number;

  /**
   * Longitude coordinate for the delivery location.
   * Must be a valid longitude value between -180 and 180 degrees.
   * 
   * @type {number}
   * @memberof CreateAddressDto
   */
  @IsLongitude()
  lng: number;
}
