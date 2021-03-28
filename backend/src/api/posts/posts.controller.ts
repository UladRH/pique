import { Body, Controller, Delete, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto';

@ApiTags('Posts')
@Controller('/api/v1/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // TODO

  @Get(':postId')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  getPostById(@Param('postId') id: string): Promise<Post> {
    return this.postsService.getById(id);
  }

  @Patch(':postId')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, type: Post })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async updatePost(@Param('postId') id: string, @Body() dto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);

    return this.postsService.update(post, dto);
  }

  @Delete(':postId')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 204, description: 'Empty Response' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @HttpCode(204)
  async removePost(@Param('postId') id: string): Promise<void> {
    const post = await this.getPostById(id);

    return this.postsService.remove(post);
  }
}
