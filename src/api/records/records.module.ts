import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from '../../entities/record.entity';
import { RecordService } from '../../services/record.service';
import { RecordsController } from './records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordsController],
  providers: [RecordService],
})
export class RecordsModule {}
