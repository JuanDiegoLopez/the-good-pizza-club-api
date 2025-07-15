import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';

/**
 * Record entity representing customization options for pizza orders.
 * Stores information about sizes, toppings, sauces, drinks, and other add-ons
 * that can be selected when customizing a pizza order.
 * 
 * @class Record
 * @entity
 */
@Entity()
export class Record {
  /**
   * Unique identifier for the record.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof Record
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Name of the customization option.
   * Examples: "Large", "Extra Cheese", "Pepperoni", "Coca Cola".
   * 
   * @type {string}
   * @memberof Record
   */
  @Column()
  name: string;

  /**
   * Type category of the customization option.
   * Must be one of the RecordTypes enum values (size, sauce, cheese, topping, etc.).
   * 
   * @type {string}
   * @memberof Record
   */
  @Column()
  type: string;

  /**
   * Additional price for this customization option.
   * Added to the base product price when selected by the customer.
   * 
   * @type {number}
   * @memberof Record
   */
  @Column()
  price: number;

  /**
   * Collection of promotions that apply to this record option.
   * One-to-many relationship allowing multiple promotions per record.
   * Used when promotions apply to specific sizes or toppings.
   * 
   * @type {Promotion[]}
   * @memberof Record
   */
  @OneToMany(() => Promotion, (promotion) => promotion.size)
  promotions: Promotion[];
}
