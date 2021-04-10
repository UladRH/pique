import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { MediaService } from '../media/media.service';
import { Profile } from '../profiles/entities/profile.entity';
import { PostCounters } from './entities/post-counters.entity';
import { PostLike } from './entities/post-like.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

export interface PostsFindOpts {
  author?: Profile;
  pagination?: PaginationQueryDto;
}

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
    @InjectRepository(PostCounters) private readonly postCountersRepo: Repository<PostCounters>,
    @InjectRepository(PostLike) private readonly postLikeRepo: Repository<PostLike>,
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

  find(opts: PostsFindOpts = {}): Promise<Post[]> {
    let whereAuthor = {};
    if (opts.author) {
      whereAuthor = { profile: opts.author };
    }

    const { page, perPage } = opts.pagination ?? new PaginationQueryDto();
    const takeSkipPagination = {
      take: perPage,
      skip: perPage * (page - 1),
    };

    return this.postRepo.find({
      where: { ...whereAuthor },
      ...takeSkipPagination,
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

  async setLiked(post: Post, profile: Profile, liked: boolean) {
    if (!post.liked && liked == true) {
      await this.postLikeRepo.insert({ post, profile });
      await this.postCountersRepo.update(post.id, { likes: () => 'likes + 1' });
      post.liked = true;
      post.counters.likes++;
    } else if (post.liked && liked == false) {
      await this.postLikeRepo.delete({ post, profile });
      await this.postCountersRepo.update(post.id, { likes: () => 'likes - 1' });
      post.liked = false;
      post.counters.likes--;
    }

    return post;
  }

  populateViewerSpecific(singlePost: Post, viewer?: Profile): Promise<Post>;
  populateViewerSpecific(arrayOfPosts: Post[], viewer?: Profile): Promise<Post[]>;
  async populateViewerSpecific(posts: Post | Post[], viewer?): Promise<Post | Post[]> {
    if (!(posts instanceof Array)) {
      return (await this.populateViewerSpecific([posts], viewer))[0];
    }

    let likesIds = [];
    if (viewer) {
      likesIds = (
        await this.postLikeRepo.find({
          select: ['postId'],
          where: {
            profileId: viewer.id,
            postId: In(posts.map((post) => post.id)),
          },
        })
      ).map((like) => like.postId);
    }

    return posts.map((post) => {
      post.liked = likesIds.includes(post.id);
      return post;
    });
  }
}
