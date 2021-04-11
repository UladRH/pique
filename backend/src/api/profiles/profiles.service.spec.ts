import { createMock } from '@golevelup/ts-jest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { ProfilesCountersService } from './profiles-counters.service';
import { ProfilesService } from './profiles.service';
import { ProfileFollower } from './entities/profile-follower.entity';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';
import { AvatarStorage } from './storages/avatar.storage';
import { HeaderStorage } from './storages/header.storage';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let repo: Repository<Profile>;
  let followersRepo: Repository<ProfileFollower>;
  let avatarStorage: AvatarStorage;
  let headerStorage: HeaderStorage;
  let profileCounters: ProfilesCountersService;

  let someProfile: Profile;
  let otherProfile: Profile;
  let manyProfiles: Profile[];

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
          provide: getRepositoryToken(ProfileFollower),
          useValue: createMock<Repository<ProfileFollower>>(),
        },
        {
          provide: AvatarStorage,
          useValue: createMock<AvatarStorage>(),
        },
        {
          provide: HeaderStorage,
          useValue: createMock<HeaderStorage>(),
        },
        {
          provide: ProfilesCountersService,
          useValue: createMock<ProfilesCountersService>(),
        },
      ],
    }).compile();

    service = module.get(ProfilesService);
    repo = module.get(getRepositoryToken(Profile));
    followersRepo = module.get(getRepositoryToken(ProfileFollower));
    avatarStorage = module.get(AvatarStorage);
    headerStorage = module.get(HeaderStorage);
    profileCounters = module.get(ProfilesCountersService);

    someProfile = await factory(Profile)().make({ id: '1' });
    otherProfile = await factory(Profile)().make({ id: '2' });
    manyProfiles = [someProfile, otherProfile];
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

  describe('setFollower', () => {
    it('should follow a profile if profile not followed', async () => {
      const targetProfile = someProfile;
      const viewer = otherProfile;

      jest.spyOn(followersRepo, 'findOne').mockResolvedValue(undefined);

      await service.setFollowed(targetProfile, viewer, true);

      expect(followersRepo.insert).toBeCalledWith({ targetProfile, profile: viewer });
      expect(profileCounters.change).toHaveBeenNthCalledWith(1, targetProfile, 'followers', '+');
      expect(profileCounters.change).toHaveBeenNthCalledWith(2, viewer, 'following', '+');
    });

    it('should unfollow a profile if followed', async () => {
      const targetProfile = someProfile;
      const viewer = otherProfile;

      jest
        .spyOn(followersRepo, 'findOne')
        .mockResolvedValue({ targetProfile, profile: viewer } as ProfileFollower);

      await service.setFollowed(targetProfile, viewer, false);

      expect(followersRepo.delete).toBeCalledWith({ targetProfile, profile: viewer });
      expect(profileCounters.change).toHaveBeenNthCalledWith(1, targetProfile, 'followers', '-');
      expect(profileCounters.change).toHaveBeenNthCalledWith(2, viewer, 'following', '-');
    });

    it('should ignore if profile already followed', async () => {
      const targetProfile = someProfile;
      const viewer = otherProfile;

      jest
        .spyOn(followersRepo, 'findOne')
        .mockResolvedValue({ targetProfile, profile: viewer } as ProfileFollower);

      await service.setFollowed(targetProfile, viewer, true);

      expect(profileCounters.change).not.toBeCalled();
      expect(followersRepo.insert).not.toBeCalled();
      expect(followersRepo.delete).not.toBeCalled();
    });

    it('should ignore if profile already unfollowed', async () => {
      const targetProfile = someProfile;
      const viewer = otherProfile;

      jest.spyOn(followersRepo, 'findOne').mockResolvedValue(undefined);

      await service.setFollowed(targetProfile, viewer, false);

      expect(profileCounters.change).not.toBeCalled();
      expect(followersRepo.insert).not.toBeCalled();
      expect(followersRepo.delete).not.toBeCalled();
    });

    it('should throw ForbiddenException if target and viewer equals', async () => {
      await expect(service.setFollowed(someProfile, someProfile, true)).rejects.toThrow(
        ForbiddenException,
      );
      await expect(service.setFollowed(someProfile, someProfile, false)).rejects.toThrow(
        ForbiddenException,
      );

      expect(profileCounters.change).not.toBeCalled();
      expect(followersRepo.insert).not.toBeCalled();
      expect(followersRepo.delete).not.toBeCalled();
    });
  });

  describe('populateViewerSpecific', () => {
    it('should populate profiles for viewer', async () => {
      jest
        .spyOn(followersRepo, 'find')
        .mockResolvedValue([{ targetProfileId: '1' } as ProfileFollower]);

      manyProfiles[1].id = '2';
      const profiles = await service.populateViewerSpecific(manyProfiles, someProfile);

      await expect(profiles[0].followed).toEqual(true);
      await expect(profiles[1].followed).toEqual(false);
    });

    it('should populate profiles for anonymous viewer', async () => {
      jest.spyOn(followersRepo, 'find');

      const profiles = await service.populateViewerSpecific(manyProfiles);

      await expect(profiles[0].followed).toEqual(false);
      await expect(profiles[1].followed).toEqual(false);
      await expect(followersRepo.find).not.toBeCalled();
    });

    it('should populate for single profile', async () => {
      const profile = await service.populateViewerSpecific(someProfile);

      await expect(profile.followed).toEqual(false);
    });
  });
});
