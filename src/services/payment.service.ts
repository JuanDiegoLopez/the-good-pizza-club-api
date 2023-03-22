import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { UserService } from './user.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment) private repo: Repository<Payment>,
    private userService: UserService,
  ) {}

  find(userId: number) {
    return this.repo.findBy({ user: { id: userId } });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async create(userId: number, data: Partial<Payment>) {
    const user = await this.userService.findOne(userId);
    const payment = this.repo.create(data);

    payment.user = user;

    return this.repo.save(payment);
  }

  async remove(id: number) {
    const payment = await this.findOne(id);

    if (!payment) throw new NotFoundException('Payment not found');

    return this.repo.remove(payment);
  }
}
