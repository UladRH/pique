import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
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
  @ApiProperty({ example: '1' })
  @Type(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  email?: string;

  @ApiHideProperty()
  @Exclude()
  @Column()
  hashed_password?: string;

  @ApiProperty({ example: '1' })
  @Type(() => String)
  @Column()
  profileId: string;

  @ManyToOne(() => Profile, { eager: true, cascade: true })
  profile: Profile;

  @ApiHideProperty()
  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
