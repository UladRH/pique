import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UploadedFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqFileUploadEndpoint } from '../shared/decorators/file-upload-endpoint.decorator';
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
    // User can manage only own profile
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

  @Put(':profileId/avatar')
  @PqRequiresAuth()
  @PqFileUploadEndpoint()
  @ApiOperation({ summary: 'Upload a profile avatar' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updateProfileAvatar(
    @Param('profileId') id: string,
    @PqUser('profile') profile: Profile,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Profile> {
    // User can manage only own profile
    if (profile.id != id) {
      throw new ForbiddenException();
    }

    return this.profilesService.updateAvatar(profile, file);
  }

  @Delete(':profileId/avatar')
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Remove a profile avatar' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async removeProfileAvatar(
    @Param('profileId') id: string,
    @PqUser('profile') profile: Profile,
  ): Promise<Profile> {
    // User can manage only own profile
    if (profile.id != id) {
      throw new ForbiddenException();
    }

    return this.profilesService.removeAvatar(profile);
  }

  @Put(':profileId/header')
  @PqRequiresAuth()
  @PqFileUploadEndpoint()
  @ApiOperation({ summary: 'Upload a profile header' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updateProfileHeader(
    @Param('profileId') id: string,
    @PqUser('profile') profile: Profile,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Profile> {
    // User can manage only own profile
    if (profile.id != id) {
      throw new ForbiddenException();
    }

    return this.profilesService.updateHeader(profile, file);
  }

  @Delete(':profileId/header')
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Remove a profile header' })
  @ApiResponse({ status: 200, type: Profile })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async removeProfileHeader(
    @Param('profileId') id: string,
    @PqUser('profile') profile: Profile,
  ): Promise<Profile> {
    // User can manage only own profile
    if (profile.id != id) {
      throw new ForbiddenException();
    }

    return this.profilesService.removeHeader(profile);
  }
}
