import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';

/**
 * Product entity representing a pizza or food item in the menu.
 * Contains detailed information about each product including pricing,
 * nutritional information, and visual presentation details.
 * 
 * @class Product
 * @entity
 */
@Entity()
export class Product {
  /**
   * Unique identifier for the product.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof Product
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Product name displayed to customers.
   * Should be descriptive and appealing (e.g., "Margherita Pizza", "Pepperoni Supreme").
   * 
   * @type {string}
   * @memberof Product
   */
  @Column()
  name: string;

  /**
   * Detailed description of the product.
   * Includes ingredients, preparation style, and any special features.
   * 
   * @type {string}
   * @memberof Product
   */
  @Column()
  description: string;

  /**
   * Base price of the product in the system's currency.
   * May be modified by promotions or size selections.
   * 
   * @type {number}
   * @memberof Product
   */
  @Column()
  price: number;

  /**
   * File path or URL to the product image.
   * Used for visual presentation in the menu interface.
   * 
   * @type {string}
   * @memberof Product
   */
  @Column()
  image: string;

  /**
   * Color theme associated with the product.
   * Used for UI styling and visual consistency in the application.
   * 
   * @type {string}
   * @memberof Product
   */
  @Column()
  color: string;

  /**
   * Weight of the product in grams.
   * Useful for delivery cost calculation and nutritional information.
   * 
   * @type {number}
   * @memberof Product
   */
  @Column()
  weight: number;

  /**
   * Caloric content of the product.
   * Provides nutritional information for health-conscious customers.
   * 
   * @type {number}
   * @memberof Product
   */
  @Column()
  calories: number;

  /**
   * Collection of promotions associated with this product.
   * One-to-many relationship allowing multiple promotions per product.
   * 
   * @type {Promotion[]}
   * @memberof Product
   */
  @OneToMany(() => Promotion, (promotion) => promotion.product)
  promotions: Promotion[];
}
