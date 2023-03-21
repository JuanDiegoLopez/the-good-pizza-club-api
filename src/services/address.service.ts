import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { UserService } from './user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private repo: Repository<Address>,
    private userService: UserService,
  ) {}

  find(id: number) {
    return this.repo.findBy({ user: { id: id } });
  }

  async create(id: number, data: Partial<Address>) {
    const user = await this.userService.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    const address = this.repo.create({ user, ...data });

    return this.repo.save(address);
  }
}
