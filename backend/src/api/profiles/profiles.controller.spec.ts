import { createMock } from '@golevelup/ts-jest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { PaginationQueryDto } from '../shared/pagination/pagination-query.dto';
import { PostsService } from '../posts/posts.service';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Post } from '../posts/entities/post.entity';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto';

describe('ProfilesController', () => {
  let controller: ProfilesController;
  let profileService: ProfilesService;
  let postsService: PostsService;

  let someProfile: Profile;
  let otherProfile: Profile;
  let somePosts: Post[];

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
        {
          provide: PostsService,
          useValue: createMock<PostsService>(),
        },
      ],
    }).compile();

    controller = module.get(ProfilesController);
    profileService = module.get(ProfilesService);
    postsService = module.get(PostsService);

    someProfile = await factory(Profile)().make({ id: '1' });
    otherProfile = await factory(Profile)().make({ id: '2' });
    somePosts = await factory(Post)().makeMany(5, { profile: someProfile });
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

  describe('getProfileById', () => {
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

  describe('updateProfile', () => {
    const dto: UpdateProfileDto = {
      displayName: 'update display name',
      bio: 'update bio',
    };

    it('should successfully update a profile', async () => {
      jest.spyOn(profileService, 'update').mockResolvedValue(someProfile);

      await expect(controller.updateProfile(someProfile.id, dto, someProfile)).resolves.toEqual(
        someProfile,
      );
      expect(profileService.update).toBeCalledWith(someProfile, dto);
    });

    it('should throw ForbiddenException if user is not owner of profile', async () => {
      await expect(controller.updateProfile(someProfile.id, dto, otherProfile)).rejects.toThrow(
        ForbiddenException,
      );
      expect(profileService.update).not.toBeCalled();
    });
  });

  describe('getProfilePosts', () => {
    const query = new PaginationQueryDto();

    it('should get profile posts', async () => {
      jest.spyOn(profileService, 'getById').mockResolvedValue(someProfile);
      jest.spyOn(postsService, 'findByProfile').mockResolvedValue(somePosts);

      await expect(controller.getProfilePosts(someProfile.id, query)).resolves.toEqual(somePosts);
      expect(postsService.findByProfile).toBeCalledWith(someProfile, query);
    });

    it('should throw NotFoundException', async () => {
      jest.spyOn(profileService, 'getById').mockRejectedValue(new NotFoundException());

      await expect(controller.getProfilePosts(someProfile.id, query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateProfileAvatar', () => {
    const someImage = createMock<Express.Multer.File>();

    it('should successfully update a profile avatar', async () => {
      jest.spyOn(profileService, 'updateAvatar').mockResolvedValue(someProfile);

      await expect(
        controller.updateProfileAvatar(someProfile.id, someProfile, someImage),
      ).resolves.toEqual(someProfile);
      expect(profileService.updateAvatar).toBeCalledWith(someProfile, someImage);
    });

    it('should throw ForbiddenException if user is not owner of profile', async () => {
      await expect(
        controller.updateProfileAvatar(someProfile.id, otherProfile, someImage),
      ).rejects.toThrow(ForbiddenException);
      expect(profileService.updateAvatar).not.toBeCalled();
    });
  });

  describe('removeProfileAvatar', () => {
    it('should successfully remove a profile avatar', async () => {
      jest.spyOn(profileService, 'removeAvatar').mockResolvedValue(someProfile);

      await expect(controller.removeProfileAvatar(someProfile.id, someProfile)).resolves.toEqual(
        someProfile,
      );
      expect(profileService.removeAvatar).toBeCalledWith(someProfile);
    });

    it('should throw ForbiddenException if user is not owner of profile', async () => {
      await expect(controller.removeProfileAvatar(someProfile.id, otherProfile)).rejects.toThrow(
        ForbiddenException,
      );
      expect(profileService.removeAvatar).not.toBeCalled();
    });
  });

  describe('updateProfileHeader', () => {
    const someImage = createMock<Express.Multer.File>();

    it('should successfully update a profile header', async () => {
      jest.spyOn(profileService, 'updateHeader').mockResolvedValue(someProfile);

      await expect(
        controller.updateProfileHeader(someProfile.id, someProfile, someImage),
      ).resolves.toEqual(someProfile);
      expect(profileService.updateHeader).toBeCalledWith(someProfile, someImage);
    });

    it('should throw ForbiddenException if user is not owner of profile', async () => {
      await expect(
        controller.updateProfileHeader(someProfile.id, otherProfile, someImage),
      ).rejects.toThrow(ForbiddenException);
      expect(profileService.updateHeader).not.toBeCalled();
    });
  });

  describe('removeProfileHeader', () => {
    it('should successfully remove a profile header', async () => {
      jest.spyOn(profileService, 'removeHeader').mockResolvedValue(someProfile);

      await expect(controller.removeProfileHeader(someProfile.id, someProfile)).resolves.toEqual(
        someProfile,
      );
      expect(profileService.removeHeader).toBeCalledWith(someProfile);
    });

    it('should throw ForbiddenException if user is not owner of profile', async () => {
      await expect(controller.removeProfileHeader(someProfile.id, otherProfile)).rejects.toThrow(
        ForbiddenException,
      );
      expect(profileService.removeHeader).not.toBeCalled();
    });
  });
});
