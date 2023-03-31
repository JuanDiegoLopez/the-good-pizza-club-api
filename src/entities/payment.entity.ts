import { Transform } from 'class-transformer';
import {
  AfterLoad,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CardTypes } from '../constants/global.constants';
import {
  getCardCompany,
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
  @Transform((opt) => transformCardNumber(opt.value))
  number: string;

  @Column()
  name: string;

  @Column()
  expiration: string;

  @Column()
  @Transform((opt) => transformSecurtyCode(opt.value))
  securityCode: string;

  @ManyToOne(() => User, (user) => user.payments)
  user: User;

  company: string;

  @AfterLoad()
  setCompany() {
    this.company = getCardCompany(this.number);
  }
}
