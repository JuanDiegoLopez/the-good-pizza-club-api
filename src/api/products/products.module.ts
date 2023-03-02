import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';

@Module({
  controllers: [ProductsController],
})
export class ProductsModule {}
