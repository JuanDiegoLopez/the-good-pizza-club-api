import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(data: CreateUserDto) {
    const user = this.repo.create(data);

    return this.repo.save(user);
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, updates: Partial<User>) {
    let user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    user = { ...user, ...updates };

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) throw new NotFoundException('User not found');

    return this.repo.remove(user);
  }
}
