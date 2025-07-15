import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateRecordDto } from '../../dtos/create-record.dto';
import { AdminGuard } from '../../guards/admin.guard';
import { RecordService } from '../../services/record.service';

/**
 * Records controller that handles all pizza customization options management endpoints.
 * Provides CRUD operations for customization records like sizes, toppings, sauces, and other add-ons.
 * All endpoints require admin privileges as records are core system configuration.
 * 
 * @class RecordsController
 * @route /api/records
 * @requires AdminGuard - All endpoints require administrator privileges
 */
@Controller('records')
@UseGuards(AdminGuard)
export class RecordsController {
  /**
   * Creates an instance of RecordsController.
   * 
   * @param {RecordService} recordService - Injected record service for database operations
   * @memberof RecordsController
   */
  constructor(private recordService: RecordService) {}

  /**
   * Retrieves all customization records from the system.
   * Returns all available pizza customization options for admin management.
   * 
   * @route GET /api/records
   * @returns {Promise<Record[]>} Array of all record entities in the system
   * @memberof RecordsController
   */
  @Get()
  getRecords() {
    return this.recordService.find();
  }

  /**
   * Retrieves a specific customization record by its unique ID.
   * Used for displaying detailed record information during admin management.
   * 
   * @route GET /api/records/:id
   * @param {string} id - Record ID as URL parameter
   * @returns {Promise<Record>} The record entity if found
   * @throws {NotFoundException} When record with specified ID is not found
   * @memberof RecordsController
   */
  @Get(':id')
  getRecord(@Param('id') id: string) {
    return this.recordService.findOne(parseInt(id));
  }

  /**
   * Creates a new customization record in the system.
   * Admin-only endpoint for adding new pizza customization options like sizes, toppings, or sauces.
   * 
   * @route POST /api/records
   * @param {CreateRecordDto} body - Record data including name, type, and price
   * @returns {Promise<Record>} The newly created record entity
   * @memberof RecordsController
   */
  @Post()
  createRecord(@Body() body: CreateRecordDto) {
    return this.recordService.create(body);
  }

  /**
   * Updates an existing customization record with new information.
   * Admin-only endpoint for modifying record details like price or name.
   * 
   * @route PATCH /api/records/:id
   * @param {string} id - Record ID as URL parameter
   * @param {Partial<CreateRecordDto>} body - Partial record data containing fields to update
   * @returns {Promise<Record>} The updated record entity
   * @throws {NotFoundException} When record with specified ID is not found
   * @memberof RecordsController
   */
  @Patch(':id')
  updateRecord(
    @Param('id') id: string,
    @Body() body: Partial<CreateRecordDto>,
  ) {
    return this.recordService.update(parseInt(id), body);
  }

  /**
   * Removes a customization record from the system.
   * Admin-only endpoint for permanently deleting pizza customization options.
   * 
   * @route DELETE /api/records/:id
   * @param {string} id - Record ID as URL parameter
   * @returns {Promise<Record>} The removed record entity
   * @throws {NotFoundException} When record with specified ID is not found
   * @memberof RecordsController
   */
  @Delete(':id')
  deleteRecord(@Param('id') id: string) {
    return this.recordService.remove(parseInt(id));
  }
}
