import { IsEmail, IsString } from 'class-validator';

/**
 * Data Transfer Object for user authentication/login.
 * Validates login credentials to ensure proper email format and password presence.
 * 
 * @class LoginDto
 */
export class LoginDto {
  /**
   * User's email address for authentication.
   * Must be a valid email format matching the registered email.
   * 
   * @type {string}
   * @memberof LoginDto
   */
  @IsEmail()
  email: string;

  /**
   * User's password for authentication.
   * Will be verified against the hashed password stored in the database.
   * 
   * @type {string}
   * @memberof LoginDto
   */
  @IsString()
  password: string;
}
