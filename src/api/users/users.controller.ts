import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { CreateAddressDto } from '../../dtos/create-address.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AddressService } from '../../services/address.service';

@Controller('users')
export class UsersController {
  constructor(private addressService: AddressService) {}

  @Get('/address')
  @UseGuards(AuthGuard)
  findAddresses(@Session() session: SessionData) {
    return this.addressService.find(session.user.id);
  }

  @Post('/address')
  @UseGuards(AuthGuard)
  addAddress(@Session() session: SessionData, @Body() body: CreateAddressDto) {
    return this.addressService.create(session.user.id, body);
  }
}
