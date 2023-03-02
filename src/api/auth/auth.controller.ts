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
import { LoginDto } from 'src/dtos/login.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/user.entity';
import { AuthService } from '../../services/auth.service';

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
  async signup(@Body() body: CreateUserDto, @Session() session: SessionData) {
    const user = await this.authService.registerUser(body);
    session.user = user;
    return user;
  }

  @Post('/login')
  async singIn(@Body() body: LoginDto, @Session() session: SessionData) {
    const user = await this.authService.validateUser(body.email, body.password);
    session.user = user;
    return user;
  }

  @Post('/logout')
  logout(@Session() session: SessionData) {
    session.user = null;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@Session() session: SessionData) {
    return session.user;
  }
}
