import { IsEnum, IsString } from 'class-validator';
import { CardTypes } from '../constants/global.constants';

/**
 * Data Transfer Object for creating new payment methods.
 * Validates credit/debit card information for secure payment processing.
 * Card data will be automatically masked after processing for security.
 * 
 * @class CreatePaymentDto
 */
export class CreatePaymentDto {
  /**
   * Type of payment card (credit or debit).
   * Must be one of the predefined CardTypes enum values.
   * 
   * @type {CardTypes}
   * @memberof CreatePaymentDto
   */
  @IsEnum(CardTypes)
  type: CardTypes;

  /**
   * Complete credit card number.
   * Will be automatically masked after processing, showing only last 4 digits.
   * 
   * @type {string}
   * @memberof CreatePaymentDto
   */
  @IsString()
  number: string;

  /**
   * Cardholder's name as it appears on the card.
   * Used for payment verification and processing.
   * 
   * @type {string}
   * @memberof CreatePaymentDto
   */
  @IsString()
  name: string;

  /**
   * Card expiration date.
   * Should be in MM/YY or MM/YYYY format depending on system requirements.
   * 
   * @type {string}
   * @memberof CreatePaymentDto
   */
  @IsString()
  expiration: string;

  /**
   * Card security code (CVV/CVC).
   * Will be completely masked after processing for enhanced security.
   * 
   * @type {string}
   * @memberof CreatePaymentDto
   */
  @IsString()
  securityCode: string;
}
