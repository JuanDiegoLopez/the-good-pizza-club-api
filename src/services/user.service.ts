import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

/**
 * User service that handles all user-related database operations.
 * Provides CRUD operations for user management including creation,
 * retrieval, updates, and deletion with proper error handling.
 * 
 * @class UserService
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of UserService.
   * 
   * @param {Repository<User>} repo - Injected TypeORM repository for User entity operations
   * @memberof UserService
   */
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  /**
   * Creates a new user in the database.
   * Converts the DTO data into a User entity and persists it to the database.
   * 
   * @param {CreateUserDto} data - User data for creation including email, password, and personal info
   * @returns {Promise<User>} The newly created and saved user entity
   * @memberof UserService
   */
  create(data: CreateUserDto) {
    /** Create a new User entity instance from the provided data */
    const user = this.repo.create(data);

    /** Save the user entity to the database and return the result */
    return this.repo.save(user);
  }

  /**
   * Finds users by email address.
   * Returns an array of users matching the provided email (typically 0 or 1 user).
   * 
   * @param {string} email - Email address to search for
   * @returns {Promise<User[]>} Array of users with matching email address
   * @memberof UserService
   */
  find(email: string) {
    return this.repo.findBy({ email });
  }

  /**
   * Finds a single user by their unique ID.
   * Used for retrieving specific user information for updates or authentication.
   * 
   * @param {number} id - Unique identifier of the user
   * @returns {Promise<User | null>} The user entity if found, null otherwise
   * @memberof UserService
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  /**
   * Updates an existing user with new information.
   * Merges the provided updates with the existing user data and saves the result.
   * 
   * @async
   * @param {number} id - Unique identifier of the user to update
   * @param {Partial<User>} updates - Partial user data containing fields to update
   * @returns {Promise<User>} The updated user entity
   * @throws {NotFoundException} When user with specified ID is not found
   * @memberof UserService
   */
  async update(id: number, updates: Partial<User>) {
    /** Find the user to update */
    let user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    /** Merge existing user data with updates */
    user = { ...user, ...updates };

    /** Save the updated user to the database */
    return this.repo.save(user);
  }

  /**
   * Removes a user from the database.
   * Permanently deletes the user entity and all associated data.
   * 
   * @async
   * @param {number} id - Unique identifier of the user to remove
   * @returns {Promise<User>} The removed user entity
   * @throws {NotFoundException} When user with specified ID is not found
   * @memberof UserService
   */
  async remove(id: number) {
    /** Find the user to remove */
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    /** Remove the user from the database */
    return this.repo.remove(user);
  }
}
