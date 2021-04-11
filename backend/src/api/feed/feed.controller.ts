import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from '../profiles/profiles.service';
import { Post } from '../posts/entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';

@ApiTags('Feed')
@Controller('/api/v1/feed')
export class FeedController {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly postsService: PostsService,
  ) {}

  @PqRequiresAuth()
  @ApiOperation({ summary: 'Get current profile feed' })
  @ApiResponse({ status: 201, type: [Post] })
  @Get()
  async getFeed(
    @Query() pagination: PaginationQueryDto,
    @PqUser('profile') viewer: Profile,
  ): Promise<Post[]> {
    const authorsIds = (
      await this.profilesService.findFollowingOf(viewer, {
        pagination: { page: 1, perPage: 1000 },
      })
    ).map((profile) => profile.id);

    authorsIds.push(viewer.id);

    return this.postsService.find({ authorsIds, pagination });
  }
}
