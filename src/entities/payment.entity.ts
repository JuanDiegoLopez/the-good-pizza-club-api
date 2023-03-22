import { Transform } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CardTypes } from '../constants/global.constants';
import {
  transformCardNumber,
  transformSecurtyCode,
} from '../utils/number.utils';
import { User } from './user.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: CardTypes;

  @Column()
  bank: string;

  @Column()
  @Transform((opt) => transformCardNumber(opt.value))
  number: string;

  @Column()
  name: string;

  @Column()
  expiration: string;

  @Column()
  @Transform((opt) => transformSecurtyCode(opt.value))
  securityCode: number;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;
}
