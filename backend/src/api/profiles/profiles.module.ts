import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsModule } from '../posts/posts.module';
import { ProfilesCountersService } from './profiles-counters.service';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfileCounters } from './entities/profile-counters.entity';
import { Profile } from './entities/profile.entity';
import { AvatarStorage } from './storages/avatar.storage';
import { HeaderStorage } from './storages/header.storage';

@Module({
  imports: [PostsModule, TypeOrmModule.forFeature([Profile, ProfileCounters])],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesCountersService, AvatarStorage, HeaderStorage],
  exports: [ProfilesService, ProfilesCountersService],
})
export class ProfilesModule {}
