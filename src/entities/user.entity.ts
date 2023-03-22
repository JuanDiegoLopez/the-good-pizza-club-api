import { Exclude } from 'class-transformer';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../constants/global.constants';
import { Address } from './address.entity';
import { Payment } from './payment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ default: Role.User })
  @Exclude()
  role: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Address, (address) => address.id)
  addresses: Address[];

  @OneToMany(() => Payment, (payment) => payment.id)
  payments: Payment[];
}
