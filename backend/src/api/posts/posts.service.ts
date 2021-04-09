import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { MediaService } from '../media/media.service';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepo: Repository<Post>,
    private readonly mediaService: MediaService,
  ) {}

  async create(author: Profile, dto: CreatePostDto) {
    const media = await this.mediaService.findByIds(dto.mediaAttachmentsIds, {
      post: null,
      profile: author,
    });

    if (media.length < dto.mediaAttachmentsIds.length) {
      throw new NotFoundException('Media Attachments Not Found');
    }

    const post = new Post();
    post.content = dto.content;
    post.profile = author;
    post.mediaAttachments = media;

    return this.postRepo.save(post);
  }

  async getById(id: string): Promise<Post> {
    const post = await this.postRepo.findOne({ id });

    if (!post) {
      throw new NotFoundException('Post Not Found');
    }

    return post;
  }

  findByProfile(profile: Profile, { page, perPage }: PaginationQueryDto): Promise<Post[]> {
    return this.postRepo.find({
      where: { profile },
      take: perPage,
      skip: perPage * (page - 1),
      order: { id: 'DESC' },
    });
  }

  update(post: Post, dto: UpdatePostDto): Promise<Post> {
    Object.assign(post, dto);
    return this.postRepo.save(post);
  }

  async remove(post: Post): Promise<void> {
    await this.postRepo.remove(post);
  }
}
