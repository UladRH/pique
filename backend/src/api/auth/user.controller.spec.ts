import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { AuthService } from './auth.service';
import { UserController } from './user.controller';
import { Profile } from '../profiles/entities/profile.entity';
import { User } from './entities/user.entity';

describe('UserController', () => {
  let controller: UserController;
  let authService: AuthService;

  let someUser: User;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    controller = module.get(UserController);
    authService = module.get(AuthService);

    const someProfile = await factory(Profile)().make({ id: '1' });
    someUser = await factory(User)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCurrentUser', () => {
    it('should return user', async () => {
      await expect(controller.getCurrentUser(someUser)).toEqual(someUser);
    });
  });
});
