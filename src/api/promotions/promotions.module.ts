import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entities/product.entity';
import { Promotion } from '../../entities/promotion.entity';
import { Record } from '../../entities/record.entity';
import { ProductService } from '../../services/product.service';
import { PromotionService } from '../../services/promotion.service';
import { RecordService } from '../../services/record.service';
import { PromotionsController } from './promotions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Promotion, Product, Record])],
  controllers: [PromotionsController],
  providers: [PromotionService, ProductService, RecordService],
})
export class PromotionsModule {}
