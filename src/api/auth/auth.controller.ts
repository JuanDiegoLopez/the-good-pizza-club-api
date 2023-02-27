import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as RequestData } from 'express';
import { SessionData } from 'express-session';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth.service';

declare module 'express' {
  interface Request {
    user?: User;
  }
}

declare module 'express-session' {
  interface SessionData {
    user?: User;
  }
}

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  signup(@Body() body: CreateUserDto) {
    return this.authService.registerUser(body);
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  singIn(@Request() request: RequestData) {
    request.session.user = request.user;

    return request.user;
  }

  @Post('/logout')
  logout(@Session() session: SessionData) {
    session.user = null;
  }

  @Get('/whoami')
  whoAmI(@Session() session: SessionData) {
    return session.user;
  }
}
