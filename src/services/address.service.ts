import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { UserService } from './user.service';

/**
 * Address service that handles all user delivery address database operations.
 * Manages user addresses for pizza delivery with proper user associations
 * and validation.
 * 
 * @class AddressService
 */
@Injectable()
export class AddressService {
  /**
   * Creates an instance of AddressService.
   * 
   * @param {Repository<Address>} repo - Injected TypeORM repository for Address entity operations
   * @param {UserService} userService - Injected user service for user validation
   * @memberof AddressService
   */
  constructor(
    @InjectRepository(Address) private repo: Repository<Address>,
    private userService: UserService,
  ) {}

  /**
   * Finds all addresses belonging to a specific user.
   * Used to retrieve all delivery addresses for a user during checkout.
   * 
   * @param {number} id - User ID to find addresses for
   * @returns {Promise<Address[]>} Array of address entities belonging to the user
   * @memberof AddressService
   */
  find(id: number) {
    return this.repo.findBy({ user: { id: id } });
  }

  /**
   * Finds a single address by its unique ID.
   * Used for retrieving specific address details for updates or deletion.
   * 
   * @param {number} id - Unique identifier of the address
   * @returns {Promise<Address | null>} The address entity if found, null otherwise
   * @memberof AddressService
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  /**
   * Creates a new address for a specific user.
   * Validates that the user exists before creating the address association.
   * 
   * @async
   * @param {number} id - User ID to associate the address with
   * @param {Partial<Address>} data - Address data including name, description, and coordinates
   * @returns {Promise<Address>} The newly created and saved address entity
   * @throws {NotFoundException} When user with specified ID is not found
   * @memberof AddressService
   */
  async create(id: number, data: Partial<Address>) {
    /** Find and validate the user exists */
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    /** Create address entity with user association */
    const address = this.repo.create({ user, ...data });

    /** Save and return the address entity */
    return this.repo.save(address);
  }

  /**
   * Removes an address from the database.
   * Permanently deletes the delivery address from the system.
   * 
   * @async
   * @param {number} id - Unique identifier of the address to remove
   * @returns {Promise<Address>} The removed address entity
   * @throws {NotFoundException} When address with specified ID is not found
   * @memberof AddressService
   */
  async remove(id: number) {
    /** Find the address to remove */
    const payment = await this.findOne(id);

    if (!payment) throw new NotFoundException('Payment not found');

    /** Remove the address from the database */
    return this.repo.remove(payment);
  }
}
