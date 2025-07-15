import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/constants/global.constants';

/**
 * Authorization guard that protects routes requiring administrator privileges.
 * Ensures that only users with Admin role can access protected administrative endpoints.
 * Used to secure administrative functions like product management, user administration, etc.
 * 
 * @class AdminGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AdminGuard implements CanActivate {
  /**
   * Determines if the current request has administrative authorization.
   * Validates that the user is not only logged in but also has Admin role privileges.
   * 
   * @param {ExecutionContext} context - The execution context containing request information
   * @returns {boolean} True if user is authenticated and has Admin role, false otherwise
   * @memberof AdminGuard
   */
  canActivate(context: ExecutionContext): boolean {
    /** Extract the HTTP request from the execution context */
    const request = context.switchToHttp().getRequest();
    
    /** Get user data from the session */
    const user = request.session.user;

    /** 
     * Check that user exists in session AND has Admin role.
     * Both conditions must be true for authorization to succeed.
     */
    return user && user.role === Role.Admin;
  }
}
