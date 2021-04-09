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
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

describe('PostsService', () => {
  let service: PostsService;
  let repo: Repository<Post>;
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
          provide: MediaService,
          useValue: createMock<MediaService>(),
        },
      ],
    }).compile();

    service = module.get(PostsService);
    repo = module.get(getRepositoryToken(Post));
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
      jest.spyOn(repo, 'save').mockResolvedValue(somePost);
      jest.spyOn(mediaService, 'findByIds').mockResolvedValue(someManyMedia);

      await expect(service.create(someProfile, dto)).resolves.toEqual(somePost);
      expect(repo.save).toBeCalledWith({
        content: dto.content,
        profile: someProfile,
        mediaAttachments: someManyMedia,
      });
      expect(repo.save).toBeCalledTimes(1);
    });

    it('should throw NotFoundException if media received less than requested', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(somePost);
      jest.spyOn(mediaService, 'findByIds').mockResolvedValue(someManyMedia.slice(2));

      await expect(service.create(someProfile, dto)).rejects.toThrow(NotFoundException);
      expect(repo.save).not.toBeCalled();
    });
  });

  describe('getById', () => {
    it('should return post', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(somePost);

      await expect(service.getById(somePost.id)).resolves.toEqual(somePost);
      expect(repo.findOne).toBeCalledWith({ id: somePost.id });
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.getById(somePost.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByProfile', () => {
    const query = new PaginationQueryDto();
    query.page = 2;
    query.perPage = 10;

    it('should return posts', async () => {
      jest.spyOn(repo, 'find').mockResolvedValue(somePosts);

      await expect(service.findByProfile(someProfile, query)).resolves.toEqual(somePosts);
      expect(repo.find).toBeCalledWith({
        where: { profile: someProfile },
        take: query.perPage,
        skip: query.perPage * (query.page - 1),
        order: { id: 'DESC' },
      });
    });
  });

  describe('update', () => {
    const dto: UpdatePostDto = {
      content: 'Updated content',
    };

    it('should successfully update a post', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(somePost);

      await expect(service.update(somePost, dto)).resolves.toEqual(somePost);
      expect(repo.save).toBeCalledWith({
        ...somePost,
        ...dto,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should successfully remove a post', async () => {
      jest.spyOn(repo, 'remove').mockResolvedValue(somePost);

      await expect(service.remove(somePost)).resolves.toBeUndefined();
      expect(repo.remove).toBeCalledWith(somePost);
      expect(repo.remove).toBeCalledTimes(1);
    });
  });
});
