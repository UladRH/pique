import { ApiHideProperty } from '@nestjs/swagger';
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

@Entity('posts')
export class Post {
  // @example 1
  @PrimaryGeneratedColumn()
  id: string;

  // @example "Hello, World!"
  @Column()
  content?: string;

  @ManyToOne((_type) => Profile, { eager: true })
  profile: Profile;

  // @example "2021-03-28T13:10:51.000Z"
  @CreateDateColumn()
  createdAt: string;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
