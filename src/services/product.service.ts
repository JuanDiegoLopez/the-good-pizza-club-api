import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from 'src/dtos/create-product.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  find() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  create(data: CreateProductDto) {
    const product = this.repo.create(data);

    return this.repo.save(product);
  }

  async update(id: number, updates: Partial<Product>) {
    let product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    product = { ...product, ...updates };

    return this.repo.save(product);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    return this.repo.remove(product);
  }
}
