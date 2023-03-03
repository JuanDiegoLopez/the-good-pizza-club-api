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

@Controller('promotions')
@UseGuards(AuthGuard)
export class PromotionsController {
  constructor(private promotionService: PromotionService) {}

  @Get()
  getPromotions() {
    return this.promotionService.find();
  }

  @Get('/:id')
  getPromotionById(@Param('id') id: string) {
    return this.promotionService.findOne(parseInt(id));
  }

  @Post()
  @UseGuards(AdminGuard)
  createPromotion(@Body() body: CreatePromotionDto) {
    return this.promotionService.create(body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updatePromotion(@Param('id') id: string, @Body() body: Partial<Promotion>) {
    return this.promotionService.update(parseInt(id), body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deletePromotion(@Param('id') id: string) {
    return this.promotionService.remove(parseInt(id));
  }
}
