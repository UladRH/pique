import { createMock } from '@golevelup/ts-jest';
import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { HashingProvider } from '../shared/crypto/hashing.provider';
import { ProfilesService } from '../profiles/profiles.service';
import { AuthService } from './auth.service';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './web-auth/dto';

describe('AuthService', () => {
  let service: AuthService;
  let repo: Repository<User>;
  let profilesService: ProfilesService;
  let hashing: HashingProvider;

  let someUser: User;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: createMock<Repository<User>>(),
        },
        {
          provide: ProfilesService,
          useValue: createMock<ProfilesService>(),
        },
        {
          provide: HashingProvider,
          useValue: createMock<HashingProvider>(),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repo = module.get(getRepositoryToken(User));
    profilesService = module.get(ProfilesService);
    hashing = module.get(HashingProvider);

    const someProfile = await factory(Profile)().make({ id: '1' });
    someUser = await factory(User)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someUser);

      await expect(service.findById(someUser.id)).resolves.toEqual(someUser);
      expect(repo.findOne).toBeCalledWith(someUser.id);
    });

    it('should return undefined', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.findById(someUser.id)).resolves.toBeUndefined();
    });
  });

  describe('findByEmail', () => {
    it('should return user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someUser);

      await expect(service.findByEmail('UsEr@eXaMpLe.CoM')).resolves.toEqual(someUser);
      expect(repo.findOne).toBeCalledWith({ email: 'user@example.com' });
    });

    it('should return undefined', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);

      await expect(service.findByEmail('')).resolves.toBeUndefined();
    });
  });

  describe('findByEmailAndPassword', () => {
    it('should return user', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(someUser);
      jest.spyOn(hashing, 'verify').mockResolvedValue(true);

      await expect(service.findByEmailAndPassword(someUser.email, 'password')).resolves.toEqual(
        someUser,
      );
    });

    it('should return undefined if user not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(hashing, 'hash');

      await expect(
        service.findByEmailAndPassword(someUser.email, 'invalid pass'),
      ).resolves.toBeUndefined();
      expect(hashing.hash).toBeCalled();
    });

    it('should return undefined if password does not match', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(hashing, 'verify').mockResolvedValue(false);

      await expect(
        service.findByEmailAndPassword(someUser.email, 'invalid pass'),
      ).resolves.toBeUndefined();
    });
  });

  describe('register', () => {
    const dto: RegisterUserDto = {
      screenName: 'some_screen_name',
      email: 'some_email@example.com',
      password: '123456',
    };

    it('should successfully create a user', async () => {
      jest.spyOn(profilesService, 'existsByScreenName').mockResolvedValue(false);
      jest.spyOn(service, 'findByEmail').mockResolvedValue(undefined);
      jest.spyOn(hashing, 'hash').mockResolvedValue(someUser.hashed_password);
      jest.spyOn(repo, 'save').mockResolvedValue(someUser);

      await expect(service.register(dto)).resolves.toEqual(someUser);
      // expect(repo.save).toHaveBeenCalledWith(
      //   expect.objectContaining({
      //     email: dto.email,
      //     hashed_password: someUser.hashed_password,
      //     profile: expect.objectContaining({
      //       screenName: someUser.profile.screenName,
      //     }),
      //   }),
      // );
      expect(repo.save).toBeCalledTimes(1);
    });

    it('should throw UnprocessableEntityException if screenName already used', async () => {
      jest.spyOn(profilesService, 'existsByScreenName').mockResolvedValue(true);
      jest.spyOn(service, 'findByEmail').mockResolvedValue(undefined);
      jest.spyOn(repo, 'save');

      await expect(service.register(dto)).rejects.toThrow(UnprocessableEntityException);
      expect(repo.save).not.toBeCalled();
    });

    it('should throw UnprocessableEntityException if email already used', async () => {
      jest.spyOn(profilesService, 'existsByScreenName').mockResolvedValue(false);
      jest.spyOn(service, 'findByEmail').mockResolvedValue(someUser);
      jest.spyOn(repo, 'save');

      await expect(service.register(dto)).rejects.toThrow(UnprocessableEntityException);
      expect(repo.save).not.toBeCalled();
    });
  });
});
