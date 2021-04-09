import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Post } from '../posts/entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { MediaAttachment } from './entities/media-attachment.entity';

describe('MediaController', () => {
  let controller: MediaController;
  let mediaService: MediaService;

  let someMedia: MediaAttachment;
  let someProfile: Profile;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [
        {
          provide: MediaService,
          useValue: createMock<MediaService>(),
        },
      ],
    }).compile();

    controller = module.get(MediaController);
    mediaService = module.get(MediaService);

    someProfile = await factory(Profile)().make({ id: '1' });
    const somePost = await factory(Post)().make({ id: '1', profile: someProfile });
    someMedia = await factory(MediaAttachment)().make({
      id: '1',
      post: somePost,
      profile: someProfile,
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createMedia', () => {
    const someImage = createMock<Express.Multer.File>();

    it('should successfully create a new media attachment', async () => {
      jest.spyOn(mediaService, 'create').mockResolvedValue(someMedia);

      await expect(controller.createMedia(someProfile, someImage)).resolves.toEqual(someMedia);
      expect(mediaService.create).toBeCalledWith(someProfile, someImage);
    });
  });

  describe('getMediaById', () => {
    it('should return media attachment by id', async () => {
      jest.spyOn(mediaService, 'getById').mockResolvedValue(someMedia);

      await expect(controller.getMediaById(someMedia.id)).resolves.toEqual(someMedia);
      expect(mediaService.getById).toBeCalledWith(someMedia.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(mediaService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getMediaById(someMedia.id)).rejects.toThrow(NotFoundException);
    });
  });
});
