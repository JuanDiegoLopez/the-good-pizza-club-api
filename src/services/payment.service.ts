import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { UserService } from './user.service';

/**
 * Payment service that handles all user payment method database operations.
 * Manages credit/debit card information for users with proper security
 * and user associations.
 * 
 * @class PaymentService
 */
@Injectable()
export class PaymentService {
  /**
   * Creates an instance of PaymentService.
   * 
   * @param {Repository<Payment>} repo - Injected TypeORM repository for Payment entity operations
   * @param {UserService} userService - Injected user service for user validation
   * @memberof PaymentService
   */
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    private userService: UserService,
  ) {}

  /**
   * Finds all payment methods belonging to a specific user.
   * Used to retrieve all saved payment methods for a user during checkout.
   * 
   * @param {number} userId - User ID to find payment methods for
   * @returns {Promise<Payment[]>} Array of payment entities belonging to the user
   * @memberof PaymentService
   */
  find(userId: number) {
    return this.repo.findBy({ user: { id: userId } });
  }

  /**
   * Finds a single payment method by its unique ID.
   * Used for retrieving specific payment method details for updates or deletion.
   * 
   * @param {number} id - Unique identifier of the payment method
   * @returns {Promise<Payment | null>} The payment entity if found, null otherwise
   * @memberof PaymentService
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  /**
   * Creates a new payment method for a specific user.
   * Associates the payment method with the user and applies automatic
   * security transformations for card data.
   * 
   * @async
   * @param {number} userId - User ID to associate the payment method with
   * @param {Partial<Payment>} data - Payment data including card information
   * @returns {Promise<Payment>} The newly created and saved payment entity with masked card data
   * @memberof PaymentService
   */
  async create(userId: number, data: Partial<Payment>) {
    /** Find and validate the user exists */
    const user = await this.userService.findOne(userId);
    
    /** Create payment entity from the provided data */
    const payment = this.repo.create(data);

    /** Associate the payment method with the validated user */
    payment.user = user;

    /** Save and return the payment entity (card data will be automatically masked) */
    return this.repo.save(payment);
  }

  /**
   * Removes a payment method from the database.
   * Permanently deletes the payment method from the system.
   * 
   * @async
   * @param {number} id - Unique identifier of the payment method to remove
   * @returns {Promise<Payment>} The removed payment entity
   * @throws {NotFoundException} When payment method with specified ID is not found
   * @memberof PaymentService
   */
  async remove(id: number) {
    /** Find the payment method to remove */
    const payment = await this.findOne(id);

    if (!payment) throw new NotFoundException('Payment not found');

    /** Remove the payment method from the database */
    return this.repo.remove(payment);
  }
}
