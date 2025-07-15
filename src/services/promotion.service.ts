import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from '../dtos/create-promotion.dto';
import { Promotion } from '../entities/promotion.entity';
import { ProductService } from './product.service';
import { RecordService } from './record.service';

/**
 * Promotion service that handles all promotional offer database operations.
 * Manages special deals and discounts with proper product and size associations.
 * 
 * @class PromotionService
 */
@Injectable()
export class PromotionService {
  /**
   * Creates an instance of PromotionService.
   * 
   * @param {Repository<Promotion>} repo - Injected TypeORM repository for Promotion entity operations
   * @param {ProductService} productService - Injected product service for product validation
   * @param {RecordService} recordService - Injected record service for size/option validation
   * @memberof PromotionService
   */
  constructor(
    @InjectRepository(Promotion) private repo: Repository<Promotion>,
    private productService: ProductService,
    private recordService: RecordService,
  ) {}

  /**
   * Retrieves all promotions with their associated product and size information.
   * Includes relationships to provide complete promotion details.
   * 
   * @returns {Promise<Promotion[]>} Array of all promotion entities with related data
   * @memberof PromotionService
   */
  find() {
    return this.repo.find({
      relations: ['product', 'size'],
    });
  }

  /**
   * Creates a new promotional offer in the database.
   * Validates that the associated product and size exist before creation.
   * 
   * @async
   * @param {CreatePromotionDto} data - Promotion data including name, discount, and associated IDs
   * @returns {Promise<Promotion>} The newly created and saved promotion entity
   * @memberof PromotionService
   */
  async create(data: CreatePromotionDto) {
    /** Retrieve and validate the associated product */
    const product = await this.productService.findOne(data.productId);
    
    /** Retrieve and validate the associated size/record option */
    const size = await this.recordService.findOne(data.sizeId);
    
    /** Create the promotion entity from the provided data */
    const promotion = this.repo.create(data);
    
    /** Associate the validated product and size with the promotion */
    promotion.product = product;
    promotion.size = size;

    /** Save and return the complete promotion entity */
    return this.repo.save(promotion);
  }

  /**
   * Finds a single promotion by its unique ID.
   * Used for retrieving specific promotion details for updates or deletion.
   * 
   * @async
   * @param {number} id - Unique identifier of the promotion
   * @returns {Promise<Promotion>} The promotion entity if found
   * @throws {NotFoundException} When promotion with specified ID is not found
   * @memberof PromotionService
   */
  async findOne(id: number) {
    /** Find the promotion by ID */
    const promotion = await this.repo.findOneBy({ id });

    if (!promotion) throw new NotFoundException('Product not found');

    return promotion;
  }

  /**
   * Updates an existing promotion with new information.
   * Allows modification of promotion details like discount percentage or description.
   * 
   * @async
   * @param {number} id - Unique identifier of the promotion to update
   * @param {Partial<Promotion>} updates - Partial promotion data containing fields to update
   * @returns {Promise<Promotion>} The updated promotion entity
   * @memberof PromotionService
   */
  async update(id: number, updates: Partial<Promotion>) {
    /** Find the promotion to update (throws if not found) */
    let promotion = await this.findOne(id);

    /** Merge existing promotion data with updates */
    promotion = { ...promotion, ...updates };

    /** Save the updated promotion to the database */
    return this.repo.save(promotion);
  }

  /**
   * Removes a promotion from the database.
   * Permanently deletes the promotional offer from the system.
   * 
   * @async
   * @param {number} id - Unique identifier of the promotion to remove
   * @returns {Promise<Promotion>} The removed promotion entity
   * @memberof PromotionService
   */
  async remove(id: number) {
    /** Find the promotion to remove (throws if not found) */
    const promotion = await this.findOne(id);

    /** Remove the promotion from the database */
    return this.repo.remove(promotion);
  }
}
