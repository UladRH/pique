import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';
import { Post } from './post.entity';

@Entity('posts_counters')
export class PostCounters {
  @ApiHideProperty()
  @Exclude()
  @PrimaryColumn()
  postId: Post['id'];

  @ApiHideProperty()
  @Exclude()
  @OneToOne(() => Post, (p) => p.counters)
  @JoinColumn()
  post: Profile;

  @Column({ default: 0 })
  likes: number;
}
