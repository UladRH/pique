import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Patch,
  Post as HttpPost,
  Put,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PqRequiresAuth } from '../shared/decorators/require-auth.decorator';
import { PqUser } from '../shared/decorators/user.decorator';
import { PostsService } from './posts.service';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@ApiTags('Posts')
@Controller('/api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, type: Post })
  @ApiResponse({ status: 404, description: 'Media attachments Not Found' })
  createPost(@Body() dto: CreatePostDto, @PqUser('profile') profile: Profile): Promise<Post> {
    if (!dto.content && dto.mediaAttachmentsIds.length == 0) {
      throw new UnprocessableEntityException(['content or mediaAttachmentsIds must be provided']);
    }

    return this.postsService.create(profile, dto);
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async getPostById(
    @Param('postId') id: string,
    @PqUser('profile') viewer: Profile,
  ): Promise<Post> {
    const post = await this.postsService.getById(id);
    return this.postsService.populateViewerSpecific(post, viewer);
  }

  @Patch(':postId')
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updatePost(
    @Param('postId') id: string,
    @Body() dto: UpdatePostDto,
    @PqUser('profile') viewer: Profile,
  ): Promise<Post> {
    const post = await this.getPostById(id, viewer);

    // User can update only own posts
    if (post.profile.id != viewer.id) {
      throw new ForbiddenException();
    }

    return this.postsService.update(post, dto);
  }

  @Delete(':postId')
  @PqRequiresAuth()
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Empty Response' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @HttpCode(204)
  async removePost(@Param('postId') id: string, @PqUser('profile') viewer: Profile): Promise<void> {
    const post = await this.getPostById(id, viewer);

    // User can remove only own posts
    if (post.profile.id != viewer.id) {
      throw new ForbiddenException();
    }

    return this.postsService.remove(post);
  }

  @Put(':postId/liked')
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async likePost(@Param('postId') id: string, @PqUser('profile') viewer: Profile): Promise<Post> {
    const post = await this.getPostById(id, viewer);
    return this.postsService.setLiked(post, viewer, true);
  }

  @Delete(':postId/liked')
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async unlikePost(@Param('postId') id: string, @PqUser('profile') viewer: Profile): Promise<Post> {
    const post = await this.getPostById(id, viewer);
    return this.postsService.setLiked(post, viewer, false);
  }
}
