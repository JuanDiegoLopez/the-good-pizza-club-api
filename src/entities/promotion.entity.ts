import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Record } from './record.entity';

/**
 * Promotion entity representing special offers and discounts in the pizza club.
 * Links products with specific sizes/options and applies percentage-based discounts.
 * 
 * @class Promotion
 * @entity
 */
@Entity()
export class Promotion {
  /**
   * Unique identifier for the promotion.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof Promotion
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Promotion name displayed to customers.
   * Should be catchy and descriptive (e.g., "Large Pizza Special", "Friday Night Deal").
   * 
   * @type {string}
   * @memberof Promotion
   */
  @Column()
  name: string;

  /**
   * Detailed description of the promotion.
   * Explains terms, conditions, and what the customer gets.
   * 
   * @type {string}
   * @memberof Promotion
   */
  @Column()
  description: string;

  /**
   * Promotional image or banner for the offer.
   * Used in marketing materials and the application interface.
   * 
   * @type {string}
   * @memberof Promotion
   */
  @Column()
  image: string;

  /**
   * Discount percentage applied by this promotion.
   * Stored as a decimal (e.g., 0.20 for 20% off).
   * 
   * @type {number}
   * @memberof Promotion
   */
  @Column({ type: 'float' })
  discount: number;

  /**
   * The product this promotion applies to.
   * Many-to-one relationship linking promotions to specific products.
   * 
   * @type {Product}
   * @memberof Promotion
   */
  @ManyToOne(() => Product, (product) => product.promotions)
  product: Product;

  /**
   * The size or record option this promotion applies to.
   * Many-to-one relationship linking promotions to specific customization options.
   * 
   * @type {Record}
   * @memberof Promotion
   */
  @ManyToOne(() => Record, (record) => record.promotions)
  size: Record;
}
