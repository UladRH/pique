import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { UpdatePostDto } from './dto';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  let someProfile: Profile;
  let somePost: Post;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: createMock<PostsService>(),
        },
      ],
    }).compile();

    controller = module.get(PostsController);
    postsService = module.get(PostsService);

    someProfile = await factory(Profile)().make({ id: '1' });
    somePost = await factory(Post)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPostById', () => {
    it('should get post by id', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);

      await expect(controller.getPostById(somePost.id)).resolves.toEqual(somePost);
      expect(postsService.getById).toBeCalledWith(somePost.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(postsService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getPostById(someProfile.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePost', () => {
    const dto: UpdatePostDto = {
      content: 'Update content',
    };

    it('should successfully update a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'update').mockResolvedValue(somePost);

      await expect(controller.updatePost(somePost.id, dto)).resolves.toEqual(somePost);
      expect(postsService.update).toBeCalledWith(somePost, dto);
    });
  });

  describe('removePost', () => {
    it('should successfully remove a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'remove').mockResolvedValue(undefined);

      await expect(controller.removePost(somePost.id)).resolves.toBeUndefined();
      expect(postsService.remove).toBeCalledWith(somePost);
    });
  });
});
