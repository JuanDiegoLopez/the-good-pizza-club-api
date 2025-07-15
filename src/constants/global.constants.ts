/**
 * Enum defining user roles within the pizza club application.
 * Used for role-based access control and authorization.
 * 
 * @enum {string}
 */
export enum Role {
  /** Standard user role with basic permissions (view menu, place orders) */
  User = 'user',
  /** Administrator role with full permissions (manage products, users, orders) */
  Admin = 'admin',
}

/**
 * Enum defining different types of pizza customization records.
 * These represent the various options available for customizing pizza orders.
 * 
 * @enum {string}
 */
export enum RecordTypes {
  /** Pizza size options (small, medium, large, etc.) */
  Size = 'size',
  /** Sauce options (tomato, pesto, white sauce, etc.) */
  Sauce = 'sauce',
  /** Cheese options (mozzarella, cheddar, parmesan, etc.) */
  Cheese = 'cheese',
  /** Topping options (pepperoni, mushrooms, olives, etc.) */
  Topping = 'topping',
  /** Beverage options (soda, water, juice, etc.) */
  Drink = 'drink',
  /** Salad options (caesar, garden, greek, etc.) */
  Salad = 'salad',
  /** Appetizer options (garlic bread, wings, etc.) */
  Appetizer = 'appetizer',
  /** Dessert options (tiramisu, gelato, etc.) */
  Dessert = 'dessert',
}

/**
 * Enum defining payment card types accepted by the application.
 * Used to categorize and process different types of payment cards.
 * 
 * @enum {string}
 */
export enum CardTypes {
  /** Credit card payment method */
  Credit = 'credit',
  /** Debit card payment method */
  Debit = 'debit',
}

/**
 * Enum defining supported credit card companies/brands.
 * Used for card validation and display purposes in the payment system.
 * 
 * @enum {string}
 */
export enum CardCompanies {
  /** Visa credit/debit cards */
  Visa = 'Visa',
  /** Mastercard credit/debit cards */
  Mastercard = 'Mastercard',
  /** American Express cards */
  Amex = 'AMEX',
  /** Discover cards */
  Discover = 'Discover',
  /** Diners Club cards */
  Diners = 'Diners',
}
