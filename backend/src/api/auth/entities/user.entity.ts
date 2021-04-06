import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';

@Entity('users')
export class User {
  // @example 1
  @PrimaryGeneratedColumn()
  id: string;

  // @example "user@example.com"
  @Column()
  email?: string;

  @Exclude()
  @Column()
  hashed_password?: string;

  @ManyToOne((_type) => Profile, { eager: true, cascade: true })
  profile: Profile;

  // @example "2021-03-28T13:10:51.000Z"
  @CreateDateColumn()
  createdAt: string;

  // @example "2021-03-28T13:10:51.000Z"
  @UpdateDateColumn()
  updatedAt: string;
}
