import { createMock } from '@golevelup/ts-jest';
import {
  ForbiddenException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Profile } from '../profiles/entities/profile.entity';
import { Post } from './entities/post.entity';
import { CreatePostDto, UpdatePostDto } from './dto';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;

  let someProfile: Profile;
  let otherProfile: Profile;
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
          useValue: createMock<PostsService>({
            populateViewerSpecific: (posts: any) => {
              return Promise.resolve(posts);
            },
          }),
        },
      ],
    }).compile();

    controller = module.get(PostsController);
    postsService = module.get(PostsService);

    someProfile = await factory(Profile)().make({ id: '1' });
    otherProfile = await factory(Profile)().make({ id: '2' });
    somePost = await factory(Post)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createPost', () => {
    const dto: CreatePostDto = {
      content: 'Create content',
      mediaAttachmentsIds: [],
    };

    it('should successfully create a post', async () => {
      jest.spyOn(postsService, 'create').mockResolvedValue(somePost);

      await expect(controller.createPost(dto, someProfile)).resolves.toEqual(somePost);
      expect(postsService.create).toBeCalledWith(someProfile, dto);
    });

    it('should throw UnprocessableEntityException if content or mediaAttachmentsIds not provided', async () => {
      await expect(() => {
        controller.createPost(new CreatePostDto(), someProfile);
      }).toThrow(UnprocessableEntityException);
      expect(postsService.create).not.toBeCalled();
    });
  });

  describe('getPostById', () => {
    it('should get post by id', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);

      await expect(controller.getPostById(somePost.id, someProfile)).resolves.toEqual(somePost);
      expect(postsService.getById).toBeCalledWith(somePost.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(postsService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getPostById(someProfile.id, someProfile)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updatePost', () => {
    const dto: UpdatePostDto = {
      content: 'Update content',
    };

    it('should successfully update a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'update').mockResolvedValue(somePost);

      await expect(controller.updatePost(somePost.id, dto, someProfile)).resolves.toEqual(somePost);
      expect(postsService.update).toBeCalledWith(somePost, dto);
    });

    it('should throw ForbiddenException if profile is not owner', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'update');

      await expect(controller.updatePost(somePost.id, dto, otherProfile)).rejects.toThrowError(
        ForbiddenException,
      );
      expect(postsService.update).not.toBeCalled();
    });
  });

  describe('removePost', () => {
    it('should successfully remove a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'remove').mockResolvedValue(undefined);

      await expect(controller.removePost(somePost.id, someProfile)).resolves.toBeUndefined();
      expect(postsService.remove).toBeCalledWith(somePost);
    });

    it('should throw ForbiddenException if profile is not owner', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'remove');

      await expect(controller.removePost(somePost.id, otherProfile)).rejects.toThrowError(
        ForbiddenException,
      );
      expect(postsService.remove).not.toBeCalled();
    });
  });

  describe('likePost', () => {
    it('should successfully like a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'setLiked').mockResolvedValue(somePost);

      await expect(controller.likePost(somePost.id, someProfile)).resolves.toEqual(somePost);
      expect(postsService.setLiked).toBeCalledWith(somePost, someProfile, true);
    });
  });

  describe('likePost', () => {
    it('should successfully unlike a post', async () => {
      jest.spyOn(postsService, 'getById').mockResolvedValue(somePost);
      jest.spyOn(postsService, 'setLiked').mockResolvedValue(somePost);

      await expect(controller.unlikePost(somePost.id, someProfile)).resolves.toEqual(somePost);
      expect(postsService.setLiked).toBeCalledWith(somePost, someProfile, false);
    });
  });
});
