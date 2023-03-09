import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordDto } from '../dtos/create-record.dto';
import { Record } from '../entities/record.entity';

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private repo: Repository<Record>) {}

  create(data: CreateRecordDto) {
    const record = this.repo.create(data);

    return this.repo.save(record);
  }

  find() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const record = await this.repo.findOneBy({ id });

    if (!record) throw new NotFoundException('Record not found');

    return record;
  }

  async update(id: number, updates: Partial<Record>) {
    let record = await this.findOne(id);

    record = { ...record, ...updates };

    return this.repo.save(record);
  }

  async remove(id: number) {
    const record = await this.findOne(id);

    return this.repo.remove(record);
  }
}
