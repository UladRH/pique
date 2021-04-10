import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MediaModule } from '../media/media.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostCounters } from './entities/post-counters.entity';
import { PostLike } from './entities/post-like.entity';
import { Post } from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostCounters, PostLike]),
    forwardRef(() => ProfilesModule),
    MediaModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
