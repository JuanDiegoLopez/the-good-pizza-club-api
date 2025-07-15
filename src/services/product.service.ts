import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

/**
 * Product service that handles all product-related database operations.
 * Manages the pizza menu including CRUD operations for products
 * with proper validation and error handling.
 * 
 * @class ProductService
 */
@Injectable()
export class ProductService {
  /**
   * Creates an instance of ProductService.
   * 
   * @param {Repository<Product>} repo - Injected TypeORM repository for Product entity operations
   * @memberof ProductService
   */
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  /**
   * Retrieves all products from the database.
   * Returns the complete menu of available pizza products.
   * 
   * @returns {Promise<Product[]>} Array of all product entities in the system
   * @memberof ProductService
   */
  find() {
    return this.repo.find();
  }

  /**
   * Finds a single product by its unique ID.
   * Used for retrieving specific product details for orders or management.
   * 
   * @param {number} id - Unique identifier of the product
   * @returns {Promise<Product | null>} The product entity if found, null otherwise
   * @memberof ProductService
   */
  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  /**
   * Creates a new product in the database.
   * Adds a new pizza or menu item to the system with validation.
   * 
   * @param {CreateProductDto} data - Product data including name, description, price, and nutritional info
   * @returns {Promise<Product>} The newly created and saved product entity
   * @memberof ProductService
   */
  create(data: CreateProductDto) {
    /** Create a new Product entity instance from the provided data */
    const product = this.repo.create(data);

    /** Save the product entity to the database and return the result */
    return this.repo.save(product);
  }

  /**
   * Updates an existing product with new information.
   * Allows modification of product details like price, description, or availability.
   * 
   * @async
   * @param {number} id - Unique identifier of the product to update
   * @param {Partial<Product>} updates - Partial product data containing fields to update
   * @returns {Promise<Product>} The updated product entity
   * @throws {NotFoundException} When product with specified ID is not found
   * @memberof ProductService
   */
  async update(id: number, updates: Partial<Product>) {
    /** Find the product to update */
    let product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    /** Merge existing product data with updates */
    product = { ...product, ...updates };

    /** Save the updated product to the database */
    return this.repo.save(product);
  }

  /**
   * Removes a product from the database.
   * Permanently deletes the product from the menu system.
   * 
   * @async
   * @param {number} id - Unique identifier of the product to remove
   * @returns {Promise<Product>} The removed product entity
   * @throws {NotFoundException} When product with specified ID is not found
   * @memberof ProductService
   */
  async remove(id: number) {
    /** Find the product to remove */
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    /** Remove the product from the database */
    return this.repo.remove(product);
  }
}
