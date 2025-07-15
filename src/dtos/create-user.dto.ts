import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Role } from '../constants/global.constants';

/**
 * Data Transfer Object for creating new user accounts.
 * Validates user registration data including email, password, personal information,
 * and optional role assignment for administrative purposes.
 * 
 * @class CreateUserDto
 */
export class CreateUserDto {
  /**
   * User's email address for login and communication.
   * Must be a valid email format and will be used as the primary login credential.
   * 
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsEmail()
  email: string;

  /**
   * User's password for authentication.
   * Should meet security requirements (handled by validation logic).
   * 
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  password: string;

  /**
   * User's full name for personalization and delivery.
   * Used in order confirmations and customer service interactions.
   * 
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsString()
  name: string;

  /**
   * User's phone number for order confirmations and delivery contact.
   * Must be a valid phone number format for the system's locale.
   * 
   * @type {string}
   * @memberof CreateUserDto
   */
  @IsPhoneNumber()
  phone: string;

  /**
   * Optional role assignment for the user.
   * If not provided, defaults to 'User' role. Admin role can only be assigned by existing admins.
   * 
   * @type {string}
   * @memberof CreateUserDto
   * @optional
   */
  @IsOptional()
  @IsEnum(Role)
  role: string;
}
