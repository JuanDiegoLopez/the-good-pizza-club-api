import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  @Get()
  getProducts() {
    return [];
  }
}
