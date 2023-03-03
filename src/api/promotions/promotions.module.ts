import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Promotion } from '../../entities/promotion.entity';
import { ProductService } from '../../services/product.service';
import { PromotionService } from '../../services/promotion.service';
import { PromotionsController } from './promotions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, Product])],
  controllers: [PromotionsController],
  providers: [PromotionService, ProductService],
})
export class PromotionsModule {}
