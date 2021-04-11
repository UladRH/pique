import { Module } from '@nestjs/common';

import { PostsModule } from '../posts/posts.module';
import { ProfilesModule } from '../profiles/profiles.module';
import { FeedController } from './feed.controller';

@Module({
  controllers: [FeedController],
  imports: [PostsModule, ProfilesModule],
})
export class FeedModule {}
