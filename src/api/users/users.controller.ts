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

/**
 * Users controller that handles user profile management endpoints.
 * Provides functionality for managing user addresses and payment methods.
 * All endpoints require authentication and operate on the current user's data.
 * Uses ClassSerializerInterceptor to automatically exclude sensitive data.
 * 
 * @class UsersController
 * @route /api/users
 * @requires AuthGuard - All endpoints require user authentication
 */
@Controller('users')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  /**
   * Creates an instance of UsersController.
   * 
   * @param {AddressService} addressService - Injected address service for delivery address management
   * @param {PaymentService} paymentService - Injected payment service for payment method management
   * @memberof UsersController
   */
  constructor(
    private addressService: AddressService,
    private paymentService: PaymentService,
  ) {}

  /**
   * Retrieves all delivery addresses for the current authenticated user.
   * Returns addresses that the user can select during checkout.
   * 
   * @route GET /api/users/address
   * @param {SessionData} session - Express session containing authenticated user information
   * @returns {Promise<Address[]>} Array of address entities belonging to the current user
   * @memberof UsersController
   */
  @Get('/address')
  getAddresses(@Session() session: SessionData) {
    return this.addressService.find(session.user.id);
  }

  /**
   * Adds a new delivery address for the current authenticated user.
   * Creates a new address associated with the current user's account.
   * 
   * @route POST /api/users/address
   * @param {SessionData} session - Express session containing authenticated user information
   * @param {CreateAddressDto} body - Address data including name, description, and coordinates
   * @returns {Promise<Address>} The newly created address entity
   * @memberof UsersController
   */
  @Post('/address')
  addAddress(@Session() session: SessionData, @Body() body: CreateAddressDto) {
    return this.addressService.create(session.user.id, body);
  }

  /**
   * Removes a delivery address from the current user's account.
   * Permanently deletes the specified address from the system.
   * 
   * @route DELETE /api/users/address/:id
   * @param {string} id - Address ID as URL parameter
   * @returns {Promise<Address>} The removed address entity
   * @throws {NotFoundException} When address with specified ID is not found
   * @memberof UsersController
   */
  @Delete('/address/:id')
  deleteAddress(@Param('id') id: string) {
    return this.addressService.remove(Number(id));
  }

  /**
   * Retrieves all payment methods for the current authenticated user.
   * Returns payment methods that the user can select during checkout.
   * Card information is automatically masked for security.
   * 
   * @route GET /api/users/payment
   * @param {SessionData} session - Express session containing authenticated user information
   * @returns {Promise<Payment[]>} Array of payment entities belonging to the current user with masked card data
   * @memberof UsersController
   */
  @Get('/payment')
  getPayments(@Session() session: SessionData) {
    return this.paymentService.find(session.user.id);
  }

  /**
   * Adds a new payment method for the current authenticated user.
   * Creates a new payment method with automatic card data masking for security.
   * 
   * @route POST /api/users/payment
   * @param {SessionData} session - Express session containing authenticated user information
   * @param {CreatePaymentDto} body - Payment data including card information
   * @returns {Promise<Payment>} The newly created payment entity with masked card data
   * @memberof UsersController
   */
  @Post('/payment')
  addPayment(@Session() session: SessionData, @Body() body: CreatePaymentDto) {
    return this.paymentService.create(session.user.id, body);
  }

  /**
   * Removes a payment method from the current user's account.
   * Permanently deletes the specified payment method from the system.
   * 
   * @route DELETE /api/users/payment/:id
   * @param {string} id - Payment method ID as URL parameter
   * @returns {Promise<Payment>} The removed payment entity
   * @throws {NotFoundException} When payment method with specified ID is not found
   * @memberof UsersController
   */
  @Delete('/payment/:id')
  deletePayment(@Param('id') id: string) {
    return this.paymentService.remove(Number(id));
  }
}
