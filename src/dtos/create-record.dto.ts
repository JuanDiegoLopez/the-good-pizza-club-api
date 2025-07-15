import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RecordTypes } from '../constants/global.constants';

/**
 * Data Transfer Object for creating new customization records.
 * Validates data for pizza customization options like sizes, toppings,
 * sauces, and other add-ons that customers can select.
 * 
 * @class CreateRecordDto
 */
export class CreateRecordDto {
  /**
   * Name of the customization option.
   * Should be clear and descriptive (e.g., "Large", "Extra Cheese", "Pepperoni").
   * 
   * @type {string}
   * @memberof CreateRecordDto
   */
  @IsString()
  name: string;

  /**
   * Type category of the customization option.
   * Must be one of the predefined RecordTypes enum values.
   * 
   * @type {string}
   * @memberof CreateRecordDto
   */
  @IsEnum(RecordTypes)
  type: string;

  /**
   * Additional price for this customization option.
   * Added to the base product price when selected by customers.
   * 
   * @type {number}
   * @memberof CreateRecordDto
   */
  @IsNumber()
  price: number;
}
