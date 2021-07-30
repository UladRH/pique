import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MediaAttachment } from '../../media/entities/media-attachment.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { PostCounters } from './post-counters.entity';
import { PostLike } from './post-like.entity';

@Entity('posts')
export class Post {
  @ApiProperty({ example: '1' })
  @Type(() => String)
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'Hello, World!' })
  @Column()
  content?: string;

  @ApiProperty({ example: '1' })
  @Type(() => String)
  @Column()
  profileId: string;

  @ApiProperty()
  @ManyToOne(() => Profile, { eager: true })
  @JoinColumn()
  profile: Profile;

  @ApiProperty({ type: MediaAttachment, isArray: true })
  @OneToMany(() => MediaAttachment, (m) => m.post, { eager: true, cascade: true })
  mediaAttachments: MediaAttachment[];

  @ApiHideProperty()
  @Exclude()
  @OneToMany(() => PostLike, (p) => p.post, { cascade: true })
  postLikes: PostLike[];

  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => PostCounters, (p) => p.post, { eager: true, cascade: true })
  counters: PostCounters = new PostCounters();

  @ApiPropertyOptional({ example: false })
  liked?: boolean;

  @ApiProperty({ example: 42 })
  @Expose()
  get likesCount(): number {
    return this.counters.likes;
  }

  @ApiProperty({ example: '2021-03-28T13:10:51.000Z', type: Date })
  @CreateDateColumn()
  createdAt: string;

  @ApiHideProperty()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
