import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { factory, useSeeding } from 'typeorm-seeding';

import { ProfilesCountersService } from './profiles-counters.service';
import { ProfileCounters } from './entities/profile-counters.entity';
import { Profile } from './entities/profile.entity';

describe('ProfilesCountersService', () => {
  let service: ProfilesCountersService;
  let repo: Repository<ProfileCounters>;

  let someProfile: Profile;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesCountersService,
        {
          provide: getRepositoryToken(ProfileCounters),
          useValue: createMock<Repository<ProfileCounters>>(),
        },
      ],
    }).compile();

    service = module.get(ProfilesCountersService);
    repo = module.get(getRepositoryToken(ProfileCounters));

    someProfile = await factory(Profile)().make({
      id: '1',
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('change', () => {
    it('should increment counter', async () => {
      const updateMock = jest.spyOn(repo, 'update');

      someProfile.counters.posts = 0;

      await expect(service.change(someProfile, 'posts', '+')).resolves.toBeUndefined();
      expect(someProfile.counters.posts).toEqual(1);
      expect(repo.update).toBeCalledTimes(1);
      expect((updateMock.mock.calls[0][1] as any).posts()).toEqual('posts + 1');
    });

    it('should increment counter', async () => {
      const updateMock = jest.spyOn(repo, 'update');

      someProfile.counters.posts = 1;

      await expect(service.change(someProfile, 'posts', '-')).resolves.toBeUndefined();
      expect(someProfile.counters.posts).toEqual(0);
      expect(repo.update).toBeCalledTimes(1);
      expect((updateMock.mock.calls[0][1] as any).posts()).toEqual('posts - 1');
    });
  });
});
