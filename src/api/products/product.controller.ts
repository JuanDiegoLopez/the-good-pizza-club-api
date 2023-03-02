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

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  getProducts() {
    return this.productService.find();
  }

  @Get('/:id')
  getProductById(@Param('id') id: string) {
    return this.productService.findOne(parseInt(id));
  }

  @Post()
  @UseGuards(AdminGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.create(body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateProduct(@Param('id') id: string, @Body() body: Partial<Product>) {
    return this.productService.update(parseInt(id), body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeProduct(@Param('id') id: string) {
    return this.productService.remove(parseInt(id));
  }
}
