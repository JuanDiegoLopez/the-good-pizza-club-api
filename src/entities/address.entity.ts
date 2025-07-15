import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

/**
 * Address entity representing delivery locations for users.
 * Stores geographic coordinates and descriptive information for pizza delivery.
 * 
 * @class Address
 * @entity
 */
@Entity()
export class Address {
  /**
   * Unique identifier for the address.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof Address
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Friendly name for the address.
   * Examples: "Home", "Office", "Mom's House", etc.
   * 
   * @type {string}
   * @memberof Address
   */
  @Column()
  name: string;

  /**
   * Detailed address description.
   * Complete street address including building, apartment, and special instructions.
   * 
   * @type {string}
   * @memberof Address
   */
  @Column()
  description: string;

  /**
   * Latitude coordinate for the address location.
   * Used for delivery routing and distance calculations.
   * 
   * @type {number}
   * @memberof Address
   */
  @Column({ type: 'float' })
  lat: number;

  /**
   * Longitude coordinate for the address location.
   * Used for delivery routing and distance calculations.
   * 
   * @type {number}
   * @memberof Address
   */
  @Column({ type: 'float' })
  lng: number;

  /**
   * Indicates if this is the user's default delivery address.
   * Used to pre-select address during checkout process.
   * 
   * @type {boolean}
   * @memberof Address
   * @default false
   */
  @Column({ default: false })
  isDefault: boolean;

  /**
   * The user who owns this address.
   * Many-to-one relationship linking addresses to users.
   * 
   * @type {User}
   * @memberof Address
   */
  @ManyToOne(() => User, (user) => user.addresses)
  user: User;
}
