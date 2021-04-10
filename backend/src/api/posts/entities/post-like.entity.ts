import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { Profile } from '../../profiles/entities/profile.entity';
import { Post } from './post.entity';

@Entity('posts_likes')
export class PostLike {
  @PrimaryColumn()
  postId: Post['id'];

  @PrimaryColumn()
  profileId: Profile['id'];

  @ManyToOne(() => Post)
  @JoinColumn()
  post: Post;

  @ManyToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @CreateDateColumn()
  createdAt: string;
}
