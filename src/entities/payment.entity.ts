import { Transform } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardTypes } from '../constants/global.constants';
import {
  getCardCompany,
  transformCardNumber,
  transformSecurtyCode,
} from '../utils/number.utils';
import { User } from './user.entity';

/**
 * Payment entity representing credit/debit card information for users.
 * Stores encrypted card details with automatic masking for security.
 * Automatically determines card company based on card number.
 * 
 * @class Payment
 * @entity
 */
@Entity()
export class Payment {
  /**
   * Unique identifier for the payment method.
   * Auto-generated primary key.
   * 
   * @type {number}
   * @memberof Payment
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Type of card (credit or debit).
   * Must be one of the CardTypes enum values.
   * 
   * @type {CardTypes}
   * @memberof Payment
   */
  @Column()
  type: CardTypes;

  /**
   * Credit card number with automatic masking transformation.
   * Only the last 4 digits are visible when retrieved from the database.
   * 
   * @type {string}
   * @memberof Payment
   */
  @Column()
  @Transform((opt) => transformCardNumber(opt.value))
  number: string;

  /**
   * Cardholder's name as it appears on the card.
   * Used for payment processing and verification.
   * 
   * @type {string}
   * @memberof Payment
   */
  @Column()
  name: string;

  /**
   * Card expiration date.
   * Typically stored in MM/YY format.
   * 
   * @type {string}
   * @memberof Payment
   */
  @Column()
  expiration: string;

  /**
   * Card security code (CVV/CVC) with automatic masking.
   * Completely hidden when retrieved from the database for security.
   * 
   * @type {string}
   * @memberof Payment
   */
  @Column()
  @Transform((opt) => transformSecurtyCode(opt.value))
  securityCode: string;

  /**
   * The user who owns this payment method.
   * Many-to-one relationship linking payment methods to users.
   * 
   * @type {User}
   * @memberof Payment
   */
  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  /**
   * Automatically determined card company/brand.
   * Not stored in database, computed from card number after loading.
   * 
   * @type {string}
   * @memberof Payment
   */
  company: string;

  /**
   * Lifecycle hook that automatically determines the card company
   * based on the card number after the entity is loaded from the database.
   * 
   * @memberof Payment
   */
  @AfterLoad()
  setCompany() {
    this.company = getCardCompany(this.number);
  }
}
