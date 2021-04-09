import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';
import { AvatarStorage } from './storages/avatar.storage';
import { HeaderStorage } from './storages/header.storage';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let repo: Repository<Profile>;
  let avatarStorage: AvatarStorage;
  let headerStorage: HeaderStorage;

  let someProfile: Profile;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getRepositoryToken(Profile),
          useValue: createMock<Repository<Profile>>(),
        },
        {
          provide: AvatarStorage,
          useValue: createMock<AvatarStorage>(),
        },
        {
          provide: HeaderStorage,
          useValue: createMock<HeaderStorage>(),
        },
      ],
    }).compile();

    service = module.get(ProfilesService);
    repo = module.get(getRepositoryToken(Profile));
    avatarStorage = module.get(AvatarStorage);
    headerStorage = module.get(HeaderStorage);

    someProfile = await factory(Profile)().make({ id: '1' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return profile', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someProfile);

      await expect(service.getById(someProfile.id)).resolves.toEqual(someProfile);
      expect(repo.findOne).toBeCalledWith({ id: someProfile.id });
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.getById(someProfile.id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getByScreenName', () => {
    it('should return profile', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someProfile);

      await expect(service.getByScreenName(someProfile.screenName)).resolves.toEqual(someProfile);
      expect(repo.findOne).toBeCalledWith({
        indexedScreenName: Profile.castToIndexedScreenName(someProfile.screenName),
      });
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.getByScreenName(someProfile.screenName)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('existsByScreenName', () => {
    it('should return true', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someProfile);

      await expect(service.existsByScreenName(someProfile.screenName)).resolves.toEqual(true);
    });

    it('should return false', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.existsByScreenName(someProfile.screenName)).resolves.toEqual(false);
    });
  });

  describe('update', () => {
    const dto: UpdateProfileDto = {
      bio: 'Updated bio',
      displayName: 'Updated display name',
    };

    it('should successfully update a profile', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someProfile);

      await expect(service.update(someProfile, dto)).resolves.toEqual(someProfile);
      expect(repo.save).toBeCalledWith({
        ...someProfile,
        ...dto,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('updateAvatar', () => {
    const someImage = createMock<Express.Multer.File>();
    const someUri = 'so/me/_image_uri.jpg';

    it('should successfully update a profile avatar', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someProfile);
      jest.spyOn(avatarStorage, 'save').mockResolvedValue(someUri);

      await expect(service.updateAvatar(someProfile, someImage)).resolves.toEqual(someProfile);
      expect(repo.save).toBeCalledWith({
        ...someProfile,
        avatarUri: someUri,
      });
      expect(repo.save).toBeCalledTimes(1);
      expect(avatarStorage.save).toBeCalledWith(someImage);
      expect(avatarStorage.save).toBeCalledTimes(1);
    });
  });

  describe('removeAvatar', () => {
    it('should successfully remove a profile avatar', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someProfile);

      await expect(service.removeAvatar(someProfile)).resolves.toEqual(someProfile);
      expect(repo.save).toBeCalledWith({
        ...someProfile,
        avatarUri: null,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('updateHeader', () => {
    const someImage = createMock<Express.Multer.File>();
    const someUri = 'so/me/_image_uri.jpg';

    it('should successfully update a profile header', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someProfile);
      jest.spyOn(headerStorage, 'save').mockResolvedValue(someUri);

      await expect(service.updateHeader(someProfile, someImage)).resolves.toEqual(someProfile);
      expect(repo.save).toBeCalledWith({
        ...someProfile,
        headerUri: someUri,
      });
      expect(repo.save).toBeCalledTimes(1);
      expect(headerStorage.save).toBeCalledWith(someImage);
      expect(headerStorage.save).toBeCalledTimes(1);
    });
  });

  describe('removeHeader', () => {
    it('should successfully remove a profile header', async () => {
      jest.spyOn(repo, 'save').mockResolvedValue(someProfile);

      await expect(service.removeHeader(someProfile)).resolves.toEqual(someProfile);
      expect(repo.save).toBeCalledWith({
        ...someProfile,
        headerUri: null,
      });
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
