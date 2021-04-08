import { createMock } from '@golevelup/ts-jest';
import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { factory, useSeeding } from 'typeorm-seeding';

import { AuthService } from '../auth.service';
import { CURRENT_USER_ID_KEY, WebSessionService } from './web-session.service';
import { Profile } from '../../profiles/entities/profile.entity';
import { User } from '../entities/user.entity';

describe('WebSessionService', () => {
  let service: WebSessionService;
  let request: Request;
  let authService: AuthService;

  let someUser: User;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebSessionService,
        {
          provide: REQUEST,
          useValue: createMock<Request>(),
        },
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    service = await module.resolve(WebSessionService);
    request = await module.resolve(REQUEST);
    authService = await module.resolve(AuthService);

    const someProfile = await factory(Profile)().make({ id: '1' });
    someUser = await factory(User)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('storeUser', () => {
    it('should store user id in session', async () => {
      expect(service.storeUser(someUser)).toBeUndefined();
      expect(request.session[CURRENT_USER_ID_KEY]).toEqual(someUser.id);
    });
  });

  describe('loadUser', () => {
    it('should return loaded user', async () => {
      jest.spyOn(service, 'hasStoredUser').mockReturnValue(true);
      jest.spyOn(authService, 'findById').mockResolvedValue(someUser);
      request.session[CURRENT_USER_ID_KEY] = someUser.id;

      await expect(service.loadUser()).resolves.toEqual(someUser);
      expect(authService.findById).toBeCalledWith(someUser.id);
    });

    it('should return undefined', async () => {
      jest.spyOn(service, 'hasStoredUser').mockReturnValue(false);
      jest.spyOn(authService, 'findById');
      request.session[CURRENT_USER_ID_KEY] = someUser.id;

      await expect(service.loadUser()).resolves.toBeUndefined();
      expect(authService.findById).not.toBeCalled();
    });
  });

  describe('hasStoredUser', () => {
    it('should return true', async () => {
      request.session[CURRENT_USER_ID_KEY] = someUser.id;

      await expect(service.hasStoredUser()).toEqual(true);
    });

    it('should return false', async () => {
      await expect(service.hasStoredUser()).toEqual(false);
    });
  });

  describe('destroy', () => {
    it('should destroy session', async () => {
      request.session = {
        [CURRENT_USER_ID_KEY]: someUser.id,
      };

      await expect(service.destroy()).toBeUndefined();
      expect(request.session).toBeNull();
    });
  });
});
