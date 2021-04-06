import { Body, Controller, ForbiddenException, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from './profiles.service';
import { Post } from '../posts/entities/post.entity';
import { Profile } from './entities/profile.entity';
import { QueryProfileDto, UpdateProfileDto } from './dto';

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

  @Patch(':profileId')
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Update a profile' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updateProfile(
    @Param('profileId') id: string,
    @Body() dto: UpdateProfileDto,
    @PqUser('profile') profile: Profile,
  ): Promise<Profile> {
    // User can update only own profile
    if (profile.id != id) {
      throw new ForbiddenException();
    }

    return this.profilesService.update(profile, dto);
  }

  @Get(':profileId/posts')
  @ApiOperation({ summary: 'Get posts of given profile' })
  @ApiResponse({ status: 200, type: [Post] })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getProfilePosts(
    @Param('profileId') id: string,
    @Query() query: PaginationQueryDto,
  ): Promise<Post[]> {
    const profile = await this.getProfileById(id);

    return this.postsService.findByProfile(profile, query);
  }
}
