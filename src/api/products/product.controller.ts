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
import { CreateProductDto } from '../../dtos/create-product.dto';
import { Product } from '../../entities/product.entity';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { ProductService } from '../../services/product.service';

/**
 * Products controller that handles all pizza menu and product management endpoints.
 * Provides CRUD operations for products with proper authentication and authorization.
 * Read operations are available to all authenticated users, while write operations require admin privileges.
 * 
 * @class ProductsController
 * @route /api/products
 * @requires AuthGuard - All endpoints require user authentication
 */
@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  /**
   * Creates an instance of ProductsController.
   * 
   * @param {ProductService} productService - Injected product service for database operations
   * @memberof ProductsController
   */
  constructor(private productService: ProductService) {}

  /**
   * Retrieves all products from the menu.
   * Returns the complete list of available pizza products for menu display.
   * 
   * @route GET /api/products
   * @returns {Promise<Product[]>} Array of all product entities in the system
   * @memberof ProductsController
   */
  @Get()
  getProducts() {
    return this.productService.find();
  }

  /**
   * Retrieves a specific product by its unique ID.
   * Used for displaying detailed product information or order selection.
   * 
   * @route GET /api/products/:id
   * @param {string} id - Product ID as URL parameter
   * @returns {Promise<Product | null>} The product entity if found, null otherwise
   * @memberof ProductsController
   */
  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findOne(parseInt(id));
  }

  /**
   * Creates a new product in the menu.
   * Admin-only endpoint for adding new pizza products to the system.
   * 
   * @route POST /api/products
   * @param {CreateProductDto} body - Product data including name, description, price, and nutritional information
   * @returns {Promise<Product>} The newly created product entity
   * @requires AdminGuard - Only administrators can create products
   * @memberof ProductsController
   */
  @Post()
  @UseGuards(AdminGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  /**
   * Updates an existing product with new information.
   * Admin-only endpoint for modifying product details like price, description, or availability.
   * 
   * @route PATCH /api/products/:id
   * @param {string} id - Product ID as URL parameter
   * @param {Partial<Product>} body - Partial product data containing fields to update
   * @returns {Promise<Product>} The updated product entity
   * @requires AdminGuard - Only administrators can update products
   * @throws {NotFoundException} When product with specified ID is not found
   * @memberof ProductsController
   */
  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateProduct(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.productService.update(parseInt(id), body);
  }

  /**
   * Removes a product from the menu.
   * Admin-only endpoint for permanently deleting products from the system.
   * 
   * @route DELETE /api/products/:id
   * @param {string} id - Product ID as URL parameter
   * @returns {Promise<Product>} The removed product entity
   * @requires AdminGuard - Only administrators can delete products
   * @throws {NotFoundException} When product with specified ID is not found
   * @memberof ProductsController
   */
  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeProduct(@Param('id') id: string) {
    return this.productService.remove(parseInt(id));
  }
}
