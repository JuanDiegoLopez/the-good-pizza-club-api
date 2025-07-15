import { IsNumber, IsString } from 'class-validator';

/**
 * Data Transfer Object for creating new products in the pizza menu.
 * Validates product information including name, description, pricing,
 * and nutritional details required for menu display.
 * 
 * @class CreateProductDto
 */
export class CreateProductDto {
  /**
   * Product name to be displayed in the menu.
   * Should be descriptive and appealing to customers.
   * 
   * @type {string}
   * @memberof CreateProductDto
   */
  @IsString()
  name: string;

  /**
   * Detailed description of the product.
   * Should include ingredients, preparation style, and any special features.
   * 
   * @type {string}
   * @memberof CreateProductDto
   */
  @IsString()
  description: string;

  /**
   * File path or URL to the product image.
   * Used for visual presentation in the menu interface.
   * 
   * @type {string}
   * @memberof CreateProductDto
   */
  @IsString()
  image: string;

  /**
   * Color theme associated with the product.
   * Used for UI styling and visual consistency in the application.
   * 
   * @type {string}
   * @memberof CreateProductDto
   */
  @IsString()
  color: string;

  /**
   * Base price of the product in the system's currency.
   * Must be a positive number, may be modified by promotions or size selections.
   * 
   * @type {number}
   * @memberof CreateProductDto
   */
  @IsNumber()
  price: number;

  /**
   * Weight of the product in grams.
   * Used for delivery cost calculation and nutritional information display.
   * 
   * @type {number}
   * @memberof CreateProductDto
   */
  @IsNumber()
  weight: number;

  /**
   * Caloric content of the product.
   * Provides nutritional information for health-conscious customers.
   * 
   * @type {number}
   * @memberof CreateProductDto
   */
  @IsNumber()
  calories: number;
}
