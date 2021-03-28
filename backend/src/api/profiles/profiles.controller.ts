import { Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from './profiles.service';
import { Post } from '../posts/entities/post.entity';
import { Profile } from './entities/profile.entity';
import { QueryProfileDto } from './dto';

@ApiTags('Profiles')
@Controller('/api/v1/profiles')
export class ProfilesController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly postsService: PostsService,
  ) {}

  // TODO

  @Get()
  @ApiOperation({ summary: 'Get a profile by screen name' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getProfileByQuery(@Query() query: QueryProfileDto): Promise<Profile> {
    return this.profilesService.getByScreenName(query.screenName);
  }

  @Get(':profileId')
  @ApiOperation({ summary: 'Get a profile by id' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getProfileById(@Param('profileId') id: string): Promise<Profile> {
    return this.profilesService.getById(id);
  }

  @Get(':profileId/posts')
  @ApiOperation({ summary: 'Get posts of given profile' })
  @ApiResponse({ status: 200, type: [Post] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getProfilePosts(
    @Param('profileId') id: string,
    @Query() query: PaginationQueryDto,
  ): Promise<Post[]> {
    const profile = await this.getProfileById(id);

    return this.postsService.findByProfile(profile, query);
  }
}
