import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * Authentication guard that protects routes requiring user authentication.
 * Checks if a user is logged in by verifying the presence of user data in the session.
 * Used to protect any endpoint that requires a logged-in user.
 * 
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Determines if the current request is authorized to proceed.
   * Validates that a user is logged in by checking session data.
   * 
   * @param {ExecutionContext} context - The execution context containing request information
   * @returns {boolean} True if user is authenticated, false otherwise
   * @memberof AuthGuard
   */
  canActivate(context: ExecutionContext): boolean {
    /** Extract the HTTP request from the execution context */
    const request = context.switchToHttp().getRequest();
    
    /** Get user data from the session */
    const user = request.session.user;

    /** Return true if user exists in session (is logged in), false otherwise */
    return !!user;
  }
}
