import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from './user.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async registerUser(data: CreateUserDto) {
    // Check if provided email already exists in database
    const users = await this.userService.find(data.email);

    if (users.length > 0) throw new BadRequestException('Email already in use');

    // Generate salt
    const salt = randomBytes(8).toString('hex');
    // Hash salt and password together
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    // Join hash and salt
    const result = `${salt}.${hash.toString('hex')}`;

    // Create new user with the hashed password;
    return this.userService.create({ ...data, password: result });
  }

  async validateUser(email: string, password: string) {
    // Check if user exists
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new UnauthorizedException('Email or password invalid');
    }

    // Separate salt and hash
    const [salt, hash] = user.password.split('.');
    // Create hash with the supplied password
    const suppliedHash = (await scrypt(password, salt, 32)) as Buffer;

    // Compare supplied hash with stored hash
    if (hash !== suppliedHash.toString('hex')) {
      throw new UnauthorizedException('Email or password invalid');
    }

    return user;
  }
}
