import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './entities/profile.entity';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let profileService: ProfilesService;

  let someProfile: Profile;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilesController],
      providers: [
        {
          provide: ProfilesService,
          useValue: createMock<ProfilesService>(),
        },
      ],
    }).compile();

    controller = module.get(ProfilesController);
    profileService = module.get(ProfilesService);

    someProfile = await factory(Profile)().make({ id: '1' });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfileByQuery', () => {
    it('should get profile by screenName', async () => {
      jest.spyOn(profileService, 'getByScreenName').mockResolvedValue(someProfile);

      await expect(
        controller.getProfileByQuery({ screenName: someProfile.screenName }),
      ).resolves.toEqual(someProfile);
      expect(profileService.getByScreenName).toBeCalledWith(someProfile.screenName);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getByScreenName').mockRejectedValue(new NotFoundException());

      await expect(
        controller.getProfileByQuery({ screenName: someProfile.screenName }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getProfileByQuery', () => {
    it('should get profile by id', async () => {
      jest.spyOn(profileService, 'getById').mockResolvedValue(someProfile);

      await expect(controller.getProfileById(someProfile.id)).resolves.toEqual(someProfile);
      expect(profileService.getById).toBeCalledWith(someProfile.id);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getProfileById(someProfile.id)).rejects.toThrow(NotFoundException);
    });
  });
});
