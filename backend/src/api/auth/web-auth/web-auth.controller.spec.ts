import { createMock } from '@golevelup/ts-jest';
import { HttpException, UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { factory, useSeeding } from 'typeorm-seeding';

import { AuthService } from '../auth.service';
import { WebSessionService } from './web-session.service';
import { WebAuthController } from './web-auth.controller';
import { Profile } from '../../profiles/entities/profile.entity';
import { User } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from './dto';

describe('WebAuthController', () => {
  let controller: WebAuthController;
  let authService: AuthService;
  let sessionService: WebSessionService;

  let someUser: User;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAuthController],
      providers: [
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
        {
          provide: WebSessionService,
          useValue: createMock<WebSessionService>(),
        },
      ],
    }).compile();

    controller = module.get(WebAuthController);
    authService = module.get(AuthService);
    sessionService = module.get(WebSessionService);

    const someProfile = await factory(Profile)().make({ id: '1' });
    someUser = await factory(User)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    const dto: RegisterUserDto = {
      screenName: 'some_user_name',
      email: 'someemail@example.com',
      password: '123456',
    };

    it('should successfully register a user and store them in session', async () => {
      jest.spyOn(authService, 'register').mockResolvedValue(someUser);
      jest.spyOn(sessionService, 'storeUser');

      await expect(controller.register(dto)).resolves.toEqual(someUser);
      expect(authService.register).toBeCalledWith(dto);
      expect(sessionService.storeUser).toBeCalledWith(someUser);
    });

    it('should throw UnprocessableEntityException', async () => {
      jest.spyOn(authService, 'register').mockRejectedValue(new UnprocessableEntityException());
      jest.spyOn(sessionService, 'storeUser');

      await expect(controller.register(dto)).rejects.toThrowError(UnprocessableEntityException);
      expect(sessionService.storeUser).not.toBeCalled();
    });
  });

  describe('login', () => {
    const dto: LoginUserDto = {
      email: 'someemail@example.com',
      password: '123456',
    };

    it('should successfully store user in session', async () => {
      jest.spyOn(authService, 'findByEmailAndPassword').mockResolvedValue(someUser);
      jest.spyOn(sessionService, 'storeUser');

      await expect(controller.login(dto)).resolves.toEqual(someUser);
      expect(authService.findByEmailAndPassword).toBeCalledWith(dto.email, dto.password);
      expect(sessionService.storeUser).toBeCalledWith(someUser);
    });

    it('should throw HttpException', async () => {
      jest.spyOn(authService, 'findByEmailAndPassword').mockResolvedValue(undefined);
      jest.spyOn(sessionService, 'storeUser');

      await expect(controller.login(dto)).rejects.toThrowError(HttpException);
      expect(sessionService.storeUser).not.toBeCalled();
    });
  });

  describe('logout', () => {
    it('should successfully destroy session', async () => {
      jest.spyOn(sessionService, 'destroy');

      expect(controller.logout()).toBeUndefined();
      expect(sessionService.destroy).toBeCalled();
    });
  });
});
