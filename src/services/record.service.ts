import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { Record } from '../entities/record.entity';

/**
 * Record service that handles all pizza customization option database operations.
 * Manages sizes, toppings, sauces, and other add-ons that customers can select
 * when customizing their pizza orders.
 * 
 * @class RecordService
 */
@Injectable()
export class RecordService {
  /**
   * Creates an instance of RecordService.
   * 
   * @param {Repository<Record>} repo - Injected TypeORM repository for Record entity operations
   * @memberof RecordService
   */
  constructor(@InjectRepository(Record) private repo: Repository<Record>) {}

  /**
   * Creates a new customization record in the database.
   * Adds new options like sizes, toppings, or other pizza customizations.
   * 
   * @param {CreateRecordDto} data - Record data including name, type, and price
   * @returns {Promise<Record>} The newly created and saved record entity
   * @memberof RecordService
   */
  create(data: CreateRecordDto) {
    /** Create a new Record entity instance from the provided data */
    const record = this.repo.create(data);

    /** Save the record entity to the database and return the result */
    return this.repo.save(record);
  }

  /**
   * Retrieves all customization records from the database.
   * Returns all available pizza customization options for menu display.
   * 
   * @returns {Promise<Record[]>} Array of all record entities in the system
   * @memberof RecordService
   */
  find() {
    return this.repo.find();
  }

  /**
   * Finds a single record by its unique ID.
   * Used for retrieving specific customization option details.
   * 
   * @async
   * @param {number} id - Unique identifier of the record
   * @returns {Promise<Record>} The record entity if found
   * @throws {NotFoundException} When record with specified ID is not found
   * @memberof RecordService
   */
  async findOne(id: number) {
    /** Find the record by ID */
    const record = await this.repo.findOneBy({ id });

    if (!record) throw new NotFoundException('Record not found');

    return record;
  }

  /**
   * Updates an existing record with new information.
   * Allows modification of customization option details like price or name.
   * 
   * @async
   * @param {number} id - Unique identifier of the record to update
   * @param {Partial<Record>} updates - Partial record data containing fields to update
   * @returns {Promise<Record>} The updated record entity
   * @memberof RecordService
   */
  async update(id: number, updates: Partial<Record>) {
    /** Find the record to update (throws if not found) */
    let record = await this.findOne(id);

    /** Merge existing record data with updates */
    record = { ...record, ...updates };

    /** Save the updated record to the database */
    return this.repo.save(record);
  }

  /**
   * Removes a record from the database.
   * Permanently deletes the customization option from the system.
   * 
   * @async
   * @param {number} id - Unique identifier of the record to remove
   * @returns {Promise<Record>} The removed record entity
   * @memberof RecordService
   */
  async remove(id: number) {
    /** Find the record to remove (throws if not found) */
    const record = await this.findOne(id);

    /** Remove the record from the database */
    return this.repo.remove(record);
  }
}
