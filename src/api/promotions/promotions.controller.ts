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
import { CreatePromotionDto } from '../../dtos/create-promotion.dto';
import { Promotion } from '../../entities/promotion.entity';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { PromotionService } from '../../services/promotion.service';

/**
 * Promotions controller that handles all promotional offers and special deals endpoints.
 * Provides CRUD operations for promotions with proper authentication and authorization.
 * Read operations are available to all authenticated users, while write operations require admin privileges.
 * 
 * @class PromotionsController
 * @route /api/promotions
 * @requires AuthGuard - All endpoints require user authentication
 */
@Controller('promotions')
@UseGuards(AuthGuard)
export class PromotionsController {
  /**
   * Creates an instance of PromotionsController.
   * 
   * @param {PromotionService} promotionService - Injected promotion service for database operations
   * @memberof PromotionsController
   */
  constructor(private promotionService: PromotionService) {}

  /**
   * Retrieves all available promotions with their associated product and size information.
   * Returns the complete list of active promotional offers for customer viewing.
   * 
   * @route GET /api/promotions
   * @returns {Promise<Promotion[]>} Array of all promotion entities with related product and size data
   * @memberof PromotionsController
   */
  @Get()
  getPromotions() {
    return this.promotionService.find();
  }

  /**
   * Retrieves a specific promotion by its unique ID.
   * Used for displaying detailed promotion information or admin management.
   * 
   * @route GET /api/promotions/:id
   * @param {string} id - Promotion ID as URL parameter
   * @returns {Promise<Promotion>} The promotion entity if found
   * @throws {NotFoundException} When promotion with specified ID is not found
   * @memberof PromotionsController
   */
  @Get('/:id')
  getPromotionById(@Param('id') id: string) {
    return this.promotionService.findOne(parseInt(id));
  }

  /**
   * Creates a new promotional offer in the system.
   * Admin-only endpoint for adding new special deals and discounts.
   * 
   * @route POST /api/promotions
   * @param {CreatePromotionDto} body - Promotion data including name, discount, and associated product/size IDs
   * @returns {Promise<Promotion>} The newly created promotion entity
   * @requires AdminGuard - Only administrators can create promotions
   * @memberof PromotionsController
   */
  @Post()
  @UseGuards(AdminGuard)
  createPromotion(@Body() body: CreatePromotionDto) {
    return this.promotionService.create(body);
  }

  /**
   * Updates an existing promotion with new information.
   * Admin-only endpoint for modifying promotion details like discount percentage or description.
   * 
   * @route PATCH /api/promotions/:id
   * @param {string} id - Promotion ID as URL parameter
   * @param {Partial<Promotion>} body - Partial promotion data containing fields to update
   * @returns {Promise<Promotion>} The updated promotion entity
   * @requires AdminGuard - Only administrators can update promotions
   * @throws {NotFoundException} When promotion with specified ID is not found
   * @memberof PromotionsController
   */
  @Patch('/:id')
  @UseGuards(AdminGuard)
  updatePromotion(@Param('id') id: string, @Body() body: Partial<Promotion>) {
    return this.promotionService.update(parseInt(id), body);
  }

  /**
   * Removes a promotion from the system.
   * Admin-only endpoint for permanently deleting promotional offers.
   * 
   * @route DELETE /api/promotions/:id
   * @param {string} id - Promotion ID as URL parameter
   * @returns {Promise<Promotion>} The removed promotion entity
   * @requires AdminGuard - Only administrators can delete promotions
   * @throws {NotFoundException} When promotion with specified ID is not found
   * @memberof PromotionsController
   */
  @Delete('/:id')
  @UseGuards(AdminGuard)
  deletePromotion(@Param('id') id: string) {
    return this.promotionService.remove(parseInt(id));
  }
}
