import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from './user.service';

/** Promisified version of the scrypt hashing function for async/await usage */
const scrypt = promisify(_scrypt);

/**
 * Authentication service that handles user registration and login validation.
 * Provides secure password hashing with salt and user credential verification.
 * Uses scrypt algorithm for password hashing to ensure security against rainbow table attacks.
 * 
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of AuthService.
   * 
   * @param {UserService} userService - Injected user service for database operations
   * @memberof AuthService
   */
  constructor(private userService: UserService) {}

  /**
   * Registers a new user with secure password hashing.
   * Validates that the email is not already in use, then creates a new user
   * with a salted and hashed password for security.
   * 
   * @async
   * @param {CreateUserDto} data - User registration data including email, password, and personal info
   * @returns {Promise<User>} The newly created user object (password excluded)
   * @throws {BadRequestException} When email is already registered in the system
   * @memberof AuthService
   */
  async registerUser(data: CreateUserDto) {
    /** Check if provided email already exists in database */
    const users = await this.userService.find(data.email);

    if (users.length > 0) throw new BadRequestException('Email already in use');

    /** Generate a random 8-byte salt for password hashing */
    const salt = randomBytes(8).toString('hex');
    
    /** Hash the password with the salt using scrypt algorithm */
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    
    /** Combine salt and hash for storage: "salt.hash" format */
    const result = `${salt}.${hash.toString('hex')}`;

    /** Create new user with the hashed password */
    return this.userService.create({ ...data, password: result });
  }

  /**
   * Validates user login credentials against stored hash.
   * Verifies the provided email and password combination by retrieving the user,
   * extracting the salt from the stored password, and comparing hashes.
   * 
   * @async
   * @param {string} email - User's email address for authentication
   * @param {string} password - Plain text password provided by user
   * @returns {Promise<User>} The authenticated user object if credentials are valid
   * @throws {UnauthorizedException} When email doesn't exist or password is incorrect
   * @memberof AuthService
   */
  async validateUser(email: string, password: string) {
    /** Check if user exists with the provided email */
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    /** Separate salt and hash from stored password (format: "salt.hash") */
    const [salt, hash] = user.password.split('.');
    
    /** Create hash using the supplied password and stored salt */
    const suppliedHash = (await scrypt(password, salt, 32)) as Buffer;

    /** Compare the supplied hash with stored hash for authentication */
    if (hash !== suppliedHash.toString('hex')) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return user;
  }
}
