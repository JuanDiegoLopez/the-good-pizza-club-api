import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Role } from 'src/constants/global.constants';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.session.user;

    return user && user.role === Role.Admin;
  }
}
