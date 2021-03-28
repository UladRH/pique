import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from './profiles.service';
import { Post } from '../posts/entities/post.entity';
import { Profile } from './entities/profile.entity';
import { QueryProfileDto } from './dto';

@Controller('profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly postsService: PostsService,
  ) {}

  // TODO

  @Get()
  getProfileByQuery(@Query() query: QueryProfileDto): Promise<Profile> {
    return this.profilesService.getByScreenName(query.screenName);
  }

  @Get(':profileId')
  getProfileById(@Param('profileId') id: string): Promise<Profile> {
    return this.profilesService.getById(id);
  }

  @Get(':profileId/posts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProfilePosts(
    @Param('profileId') id: string,
    @Query() query: PaginationQueryDto,
  ): Promise<Post[]> {
    const profile = await this.getProfileById(id);

    return this.postsService.findByProfile(profile, query);
  }
}
