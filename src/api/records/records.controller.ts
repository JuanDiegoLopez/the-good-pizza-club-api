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

@Controller('records')
@UseGuards(AdminGuard)
export class RecordsController {
  constructor(private recordService: RecordService) {}

  @Get()
  getRecords() {
    return this.recordService.find();
  }

  @Get(':id')
  getRecord(@Param('id') id: string) {
    return this.recordService.findOne(parseInt(id));
  }

  @Post()
  createRecord(@Body() body: CreateRecordDto) {
    return this.recordService.create(body);
  }

  @Patch(':id')
  updateRecord(
    @Param('id') id: string,
    @Body() body: Partial<CreateRecordDto>,
  ) {
    return this.recordService.update(parseInt(id), body);
  }

  @Delete(':id')
  deleteRecord(@Param('id') id: string) {
    return this.recordService.remove(parseInt(id));
  }
}
