import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { MediaService } from './media.service';
import { Post } from '../posts/entities/post.entity';
import { Profile } from '../profiles/entities/profile.entity';
import { MediaAttachment } from './entities/media-attachment.entity';
import { MediaAttachmentStorage } from './storages/media-attachment.storage';

describe('MediaService', () => {
  let service: MediaService;
  let repo: Repository<MediaAttachment>;
  let mediaStorage: MediaAttachmentStorage;

  let someMedia: MediaAttachment;
  let someProfile: Profile;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(MediaAttachment),
          useValue: createMock<Repository<MediaAttachment>>(),
        },
        {
          provide: MediaAttachmentStorage,
          useValue: createMock<MediaAttachmentStorage>(),
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    repo = module.get(getRepositoryToken(MediaAttachment));
    mediaStorage = module.get(MediaAttachmentStorage);

    someProfile = await factory(Profile)().make({ id: '1' });
    const somePost = await factory(Post)().make({ id: '1', profile: someProfile });
    someMedia = await factory(MediaAttachment)().make({
      id: '1',
      post: somePost,
      profile: someProfile,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const someImage = createMock<Express.Multer.File>();
    const someUri = 'so/me/_image_uri.jpg';

    it('should successfully create a new media attachment', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someMedia);
      jest.spyOn(mediaStorage, 'save').mockResolvedValue(someUri);

      await expect(service.create(someProfile, someImage)).resolves.toEqual(someMedia);
      expect(repo.save).toBeCalledWith({ profile: someProfile, fileUri: someUri });
      expect(repo.save).toBeCalledTimes(1);
      expect(mediaStorage.save).toBeCalledWith(someImage);
      expect(mediaStorage.save).toBeCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return media attachment', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someMedia);

      await expect(service.getById(someMedia.id)).resolves.toEqual(someMedia);
      expect(repo.findOne).toBeCalledWith(someMedia.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.getById(someProfile.id)).rejects.toThrow(NotFoundException);
    });
  });
});
