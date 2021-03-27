import { Body, Controller, Delete, Get, HttpCode, Param, Patch } from '@nestjs/common';

import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // TODO

  @Get(':postId')
  getPostById(@Param('postId') id: string): Promise<Post> {
    return this.postsService.getById(id);
  }

  @Patch(':postId')
  async updatePost(@Param('postId') id: string, @Body() dto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);

    return this.postsService.update(post, dto);
  }

  @Delete(':postId')
  @HttpCode(204)
  async removePost(@Param('postId') id: string): Promise<void> {
    const post = await this.getPostById(id);

    return this.postsService.remove(post);
  }
}
