import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from '../../entities/address.entity';
import { Payment } from '../../entities/payment.entity';
import { User } from '../../entities/user.entity';
import { AddressService } from '../../services/address.service';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/user.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Payment])],
  controllers: [UsersController],
  providers: [UserService, AddressService, PaymentService],
})
export class UsersModule {}
