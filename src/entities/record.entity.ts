import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Promotion } from './promotion.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Promotion, (promotion) => promotion.size)
  promotions: Promotion[];
}
