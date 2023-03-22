import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SessionData } from 'express-session';
import { CreateAddressDto } from '../../dtos/create-address.dto';
import { CreatePaymentDto } from '../../dtos/create-payment.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { AddressService } from '../../services/address.service';
import { PaymentService } from '../../services/payment.service';

@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private addressService: AddressService,
    private paymentService: PaymentService,
  ) {}

  @Get('/address')
  getAddresses(@Session() session: SessionData) {
    return this.addressService.find(session.user.id);
  }

  @Post('/address')
  addAddress(@Session() session: SessionData, @Body() body: CreateAddressDto) {
    return this.addressService.create(session.user.id, body);
  }

  @Get('/payment')
  getPayments(@Session() session: SessionData) {
    return this.paymentService.find(session.user.id);
  }

  @Post('/payment')
  addPayment(@Session() session: SessionData, @Body() body: CreatePaymentDto) {
    return this.paymentService.create(session.user.id, body);
  }

  @Delete('/payment/:id')
  deletePayment(@Param('id') id: string) {
    return this.paymentService.remove(Number(id));
  }
}
