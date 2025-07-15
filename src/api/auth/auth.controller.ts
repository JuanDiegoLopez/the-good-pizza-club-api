import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { LoginDto } from '../../dtos/login.dto';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '../../guards/auth.guard';
import { AuthService } from '../../services/auth.service';

/**
 * Extends the express-session module to include user data in the session.
 * Allows storing authenticated user information in the session for persistent login.
 */
declare module 'express-session' {
  interface SessionData {
    /** The authenticated user object stored in the session */
    user?: User;
  }
}

/**
 * Authentication controller that handles user registration, login, logout, and session management.
 * Provides secure authentication endpoints with session-based user management.
 * Uses ClassSerializerInterceptor to automatically exclude sensitive data like passwords.
 * 
 * @class AuthController
 * @route /api/auth
 */
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  /**
   * Creates an instance of AuthController.
   * 
   * @param {AuthService} authService - Injected authentication service for user validation and registration
   * @memberof AuthController
   */
  constructor(private authService: AuthService) {}

  /**
   * Registers a new user account and automatically logs them in.
   * Creates a new user with encrypted password and establishes an authenticated session.
   * 
   * @async
   * @route POST /api/auth/register
   * @param {CreateUserDto} body - User registration data including email, password, and personal information
   * @param {SessionData} session - Express session object for storing user authentication
   * @returns {Promise<User>} The newly created user object (password excluded via serialization)
   * @throws {BadRequestException} When email is already registered
   * @memberof AuthController
   */
  @Post('/register')
  async signup(@Body() body: CreateUserDto, @Session() session: SessionData) {
    /** Register the new user through the authentication service */
    const user = await this.authService.registerUser(body);
    
    /** Store the user in the session for immediate authentication */
    session.user = user;
    
    return user;
  }

  /**
   * Authenticates a user with email and password credentials.
   * Validates credentials and establishes an authenticated session on success.
   * 
   * @async
   * @route POST /api/auth/login
   * @param {LoginDto} body - Login credentials containing email and password
   * @param {SessionData} session - Express session object for storing user authentication
   * @returns {Promise<User>} The authenticated user object (password excluded via serialization)
   * @throws {UnauthorizedException} When email or password is invalid
   * @memberof AuthController
   */
  @Post('/login')
  async singIn(@Body() body: LoginDto, @Session() session: SessionData) {
    /** Validate user credentials through the authentication service */
    const user = await this.authService.validateUser(body.email, body.password);
    
    /** Store the authenticated user in the session */
    session.user = user;
    
    return user;
  }

  /**
   * Logs out the current user by clearing their session.
   * Removes user authentication data from the session, ending their login state.
   * 
   * @route POST /api/auth/logout
   * @param {SessionData} session - Express session object containing user authentication
   * @memberof AuthController
   */
  @Post('/logout')
  logout(@Session() session: SessionData) {
    /** Clear the user from the session to log them out */
    session.user = null;
  }

  /**
   * Returns the currently authenticated user's information.
   * Requires authentication guard - only accessible to logged-in users.
   * 
   * @route GET /api/auth/whoami
   * @param {SessionData} session - Express session object containing user authentication
   * @returns {User} The current user object (password excluded via serialization)
   * @requires AuthGuard - User must be authenticated to access this endpoint
   * @memberof AuthController
   */
  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@Session() session: SessionData) {
    return session.user;
  }
}
