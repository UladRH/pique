import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { MediaService } from '../media/media.service';
import { PostsService } from './posts.service';
import { MediaAttachment } from '../media/entities/media-attachment.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { PostCounters } from './entities/post-counters.entity';
import { PostLike } from './entities/post-like.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

describe('PostsService', () => {
  let service: PostsService;
  let postRepo: Repository<Post>;
  let postCountersRepo: Repository<PostCounters>;
  let postLikeRepo: Repository<PostLike>;
  let mediaService: MediaService;

  let someProfile: Profile;
  let somePost: Post;
  let somePosts: Post[];
  let someManyMedia: MediaAttachment[];

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: createMock<Repository<Post>>(),
        },
        {
          provide: getRepositoryToken(PostCounters),
          useValue: createMock<Repository<PostCounters>>(),
        },
        {
          provide: getRepositoryToken(PostLike),
          useValue: createMock<Repository<PostLike>>(),
        },
        {
          provide: MediaService,
          useValue: createMock<MediaService>(),
        },
      ],
    }).compile();

    service = module.get(PostsService);
    postRepo = module.get(getRepositoryToken(Post));
    postCountersRepo = module.get(getRepositoryToken(PostCounters));
    postLikeRepo = module.get(getRepositoryToken(PostLike));
    mediaService = module.get(MediaService);

    someProfile = await factory(Profile)().make({ id: '1' });
    somePost = await factory(Post)().make({ id: '1', profile: someProfile });
    somePosts = await factory(Post)().makeMany(5, { id: '1', profile: someProfile });
    someManyMedia = await factory(MediaAttachment)().makeMany(5, {
      id: '1',
      profile: someProfile,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreatePostDto = {
      content: 'Hello, World!',
      mediaAttachmentsIds: Array(5).fill(['id']),
    };

    it('should successfully create a post', async () => {
      jest.spyOn(postRepo, 'save').mockResolvedValue(somePost);
      jest.spyOn(mediaService, 'findByIds').mockResolvedValue(someManyMedia);

      await expect(service.create(someProfile, dto)).resolves.toEqual(somePost);
      expect(postRepo.save).toBeCalledWith({
        content: dto.content,
        profile: someProfile,
        mediaAttachments: someManyMedia,
        counters: new PostCounters(),
      });
      expect(postRepo.save).toBeCalledTimes(1);
    });

    it('should throw NotFoundException if media received less than requested', async () => {
      jest.spyOn(postRepo, 'save').mockResolvedValue(somePost);
      jest.spyOn(mediaService, 'findByIds').mockResolvedValue(someManyMedia.slice(2));

      await expect(service.create(someProfile, dto)).rejects.toThrow(NotFoundException);
      expect(postRepo.save).not.toBeCalled();
    });
  });

  describe('getById', () => {
    it('should return post', async () => {
      jest.spyOn(postRepo, 'findOne').mockResolvedValue(somePost);

      await expect(service.getById(somePost.id)).resolves.toEqual(somePost);
      expect(postRepo.findOne).toBeCalledWith({ id: somePost.id });
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(postRepo, 'findOne').mockResolvedValue(undefined);

      await expect(service.getById(somePost.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByProfile', () => {
    const pagination = new PaginationQueryDto();
    pagination.page = 2;
    pagination.perPage = 10;

    it('should return posts', async () => {
      jest.spyOn(postRepo, 'find').mockResolvedValue(somePosts);

      await expect(service.find({ author: someProfile, pagination })).resolves.toEqual(somePosts);
      expect(postRepo.find).toBeCalledWith({
        where: { profile: someProfile },
        take: pagination.perPage,
        skip: pagination.perPage * (pagination.page - 1),
        order: { id: 'DESC' },
      });
    });
  });

  describe('update', () => {
    const dto: UpdatePostDto = {
      content: 'Updated content',
    };

    it('should successfully update a post', async () => {
      jest.spyOn(postRepo, 'save').mockResolvedValue(somePost);

      await expect(service.update(somePost, dto)).resolves.toEqual(somePost);
      expect(postRepo.save).toBeCalledWith({
        ...somePost,
        ...dto,
      });
      expect(postRepo.save).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should successfully remove a post', async () => {
      jest.spyOn(postRepo, 'remove').mockResolvedValue(somePost);

      await expect(service.remove(somePost)).resolves.toBeUndefined();
      expect(postRepo.remove).toBeCalledWith(somePost);
      expect(postRepo.remove).toBeCalledTimes(1);
    });
  });

  describe('setLiked', () => {
    it('should like a post if post not liked', async () => {
      jest.spyOn(postLikeRepo, 'insert');
      jest.spyOn(postCountersRepo, 'update');

      somePost.liked = false;
      const post = await service.setLiked(somePost, someProfile, true);

      await expect(post.liked).toEqual(true);
      await expect(somePost.likesCount).toEqual(somePost.likesCount + 1);
      expect(postLikeRepo.insert).toBeCalledWith({ post: somePost, profile: someProfile });
      expect(postCountersRepo.update).toBeCalledTimes(1);
    });

    it('should unlike a post if post liked', async () => {
      jest.spyOn(postLikeRepo, 'delete');
      jest.spyOn(postCountersRepo, 'update');

      somePost.liked = true;
      const post = await service.setLiked(somePost, someProfile, false);

      await expect(post.liked).toEqual(false);
      await expect(somePost.likesCount).toEqual(somePost.likesCount - 1);
      expect(postLikeRepo.delete).toBeCalledWith({ post: somePost, profile: someProfile });
      expect(postCountersRepo.update).toBeCalledTimes(1);
    });

    it('should ignore if post already (un)liked', async () => {
      jest.spyOn(postLikeRepo, 'insert');
      jest.spyOn(postLikeRepo, 'delete');
      jest.spyOn(postCountersRepo, 'update');

      somePost.liked = true;
      let post = await service.setLiked(somePost, someProfile, true);
      await expect(post.liked).toEqual(true);
      await expect(somePost.likesCount).toEqual(somePost.likesCount);

      somePost.liked = false;
      post = await service.setLiked(somePost, someProfile, false);
      await expect(post.liked).toEqual(false);
      await expect(somePost.likesCount).toEqual(somePost.likesCount);

      expect(postLikeRepo.insert).not.toBeCalled();
      expect(postLikeRepo.delete).not.toBeCalled();
      expect(postCountersRepo.update).not.toBeCalled();
    });
  });

  describe('populateViewerSpecific', () => {
    it('should populate posts for profile', async () => {
      jest.spyOn(postLikeRepo, 'find').mockResolvedValue([{ postId: '1' } as PostLike]);

      somePosts[1].id = '2';
      const posts = await service.populateViewerSpecific(somePosts, someProfile);

      await expect(posts[0].liked).toEqual(true);
      await expect(posts[1].liked).toEqual(false);
    });

    it('should populate posts for anonymous profile', async () => {
      jest.spyOn(postLikeRepo, 'find');

      const posts = await service.populateViewerSpecific(somePosts);

      await expect(posts[0].liked).toEqual(false);
      await expect(posts[1].liked).toEqual(false);
      await expect(postLikeRepo.find).not.toBeCalled();
    });

    it('should populate for single post', async () => {
      const post = await service.populateViewerSpecific(somePost);

      await expect(post.liked).toEqual(false);
    });
  });
});
