import { Exclude } from 'class-transformer';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../constants/global.constants';

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
}
