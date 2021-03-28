import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from './posts.service';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

describe('PostsService', () => {
  let service: PostsService;
  let repo: Repository<Post>;

  let someProfile: Profile;
  let somePost: Post;
  let somePosts: Post[];

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
      ],
    }).compile();

    service = module.get(PostsService);
    repo = module.get(getRepositoryToken(Post));

    someProfile = await factory(Profile)().make({ id: '1' });
    somePost = await factory(Post)().make({ id: '1', profile: someProfile });
    somePosts = await factory(Post)().makeMany(5, { id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const dto: CreatePostDto = {
      content: 'Hello, World!',
    };

    it('should successfully create a post', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(somePost);

      await expect(service.create(someProfile, dto)).resolves.toEqual(somePost);
      expect(repo.save).toBeCalledWith({ ...dto, profile: someProfile });
      expect(repo.save).toBeCalledTimes(1);
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
        skip: query.perPage * query.page,
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
