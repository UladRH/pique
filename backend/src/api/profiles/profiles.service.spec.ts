import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let repo: Repository<Profile>;

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
      ],
    }).compile();

    service = module.get(ProfilesService);
    repo = module.get(getRepositoryToken(Profile));

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
      screenName: 'UpdatedScreenName',
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
});
