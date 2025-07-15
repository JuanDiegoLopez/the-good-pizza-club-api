import { Exclude } from 'class-transformer';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../constants/global.constants';
import { Address } from './address.entity';
import { Payment } from './payment.entity';

/**
 * User entity representing a customer or administrator in the pizza club system.
 * Stores user authentication credentials, personal information, and relationships
 * to addresses and payment methods.
 * 
 * @class User
 * @entity
 */
@Entity()
export class User {
  /**
   * Unique identifier for the user.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof User
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * User's email address.
   * Used as the primary login credential and must be unique.
   * 
   * @type {string}
   * @memberof User
   */
  @Column()
  email: string;

  /**
   * User's full name.
   * Used for personalization and order delivery.
   * 
   * @type {string}
   * @memberof User
   */
  @Column()
  name: string;

  /**
   * User's phone number.
   * Used for order confirmation and delivery contact.
   * 
   * @type {string}
   * @memberof User
   */
  @Column()
  phone: string;

  /**
   * User's role in the system (User or Admin).
   * Determines access level and available features.
   * Excluded from serialization for security.
   * 
   * @type {string}
   * @memberof User
   * @default Role.User
   */
  @Column({ default: Role.User })
  @Exclude()
  role: string;

  /**
   * User's hashed password.
   * Stored with salt for security, excluded from serialization.
   * 
   * @type {string}
   * @memberof User
   */
  @Column()
  @Exclude()
  password: string;

  /**
   * Collection of user's delivery addresses.
   * One-to-many relationship allowing multiple addresses per user.
   * 
   * @type {Address[]}
   * @memberof User
   */
  @OneToMany(() => Address, (address) => address.id)
  addresses: Address[];

  /**
   * Collection of user's payment methods.
   * One-to-many relationship allowing multiple payment methods per user.
   * 
   * @type {Payment[]}
   * @memberof User
   */
  @OneToMany(() => Payment, (payment) => payment.id)
  payments: Payment[];
}
