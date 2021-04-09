import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MediaAttachment } from '../../media/entities/media-attachment.entity';
import { Profile } from '../../profiles/entities/profile.entity';

@Entity('posts')
export class Post {
  // @example 1
  @PrimaryGeneratedColumn()
  id: string;

  // @example "Hello, World!"
  @Column()
  content?: string;

  @ManyToOne(() => Profile, { eager: true })
  profile: Profile;

  @OneToMany(() => MediaAttachment, (m) => m.post, { eager: true, cascade: true })
  mediaAttachments: MediaAttachment[];

  // @example "2021-03-28T13:10:51.000Z"
  @CreateDateColumn()
  createdAt: string;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
