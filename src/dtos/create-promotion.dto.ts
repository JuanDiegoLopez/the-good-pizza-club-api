import { IsNumber, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating new promotional offers.
 * Validates promotion data including display information, discount value,
 * and associations with specific products and sizes.
 * 
 * @class CreatePromotionDto
 */
export class CreatePromotionDto {
  /**
   * Promotion name displayed to customers.
   * Should be catchy and descriptive of the offer.
   * 
   * @type {string}
   * @memberof CreatePromotionDto
   */
  @IsString()
  name: string;

  /**
   * Detailed description of the promotional offer.
   * Should explain terms, conditions, and customer benefits clearly.
   * 
   * @type {string}
   * @memberof CreatePromotionDto
   */
  @IsString()
  description: string;

  /**
   * Promotional image or banner for the offer.
   * Used in marketing materials and the application interface.
   * 
   * @type {string}
   * @memberof CreatePromotionDto
   */
  @IsString()
  image: string;

  /**
   * Discount percentage applied by this promotion.
   * Should be between 0 and 1 (e.g., 0.20 for 20% off).
   * 
   * @type {number}
   * @memberof CreatePromotionDto
   */
  @IsNumber()
  discount: number;

  /**
   * ID of the product this promotion applies to.
   * Must reference an existing product in the database.
   * 
   * @type {number}
   * @memberof CreatePromotionDto
   */
  @IsNumber()
  productId: number;

  /**
   * ID of the size/record option this promotion applies to.
   * Must reference an existing record in the database.
   * 
   * @type {number}
   * @memberof CreatePromotionDto
   */
  @IsNumber()
  sizeId: number;
}
