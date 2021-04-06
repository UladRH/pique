import { createMock } from '@golevelup/ts-jest';
import { NextFunction, Request, Response } from 'express';
import { factory, useSeeding } from 'typeorm-seeding';

import { SessionService } from '../../auth/session.service';
import { User } from '../../auth/entities/user.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let sessionService: SessionService;

  let req: Request;
  let res: Response;
  let next: NextFunction;

  let someUser: User;

  beforeAll(async () => {
    await useSeeding();
  });

  beforeEach(async () => {
    req = {} as Request;
    res = {} as Response;
    next = jest.fn();

    sessionService = createMock<SessionService>();
    middleware = new AuthMiddleware(sessionService);

    const someProfile = await factory(Profile)().make({ id: '1' });
    someUser = await factory(User)().make({ id: '1', profile: someProfile });
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should set req.isAuthenticated and req.user', async () => {
    jest.spyOn(sessionService, 'hasStoredUser').mockReturnValue(true);
    jest.spyOn(sessionService, 'loadUser').mockResolvedValue(someUser);

    await middleware.use(req, res, next);

    expect((req as any).isAuthenticated).toEqual(true);
    expect((req as any).user).toEqual(someUser);
    expect(next).toBeCalled();
  });

  it('should set req.isAuthenticated to false if none user session', async () => {
    jest.spyOn(sessionService, 'hasStoredUser').mockReturnValue(false);

    await middleware.use(req, res, next);

    expect((req as any).isAuthenticated).toEqual(false);
    expect((req as any).user).toEqual(undefined);
    expect(next).toBeCalled();
  });

  it('should destroy session if has user session but unable to load user', async () => {
    jest.spyOn(sessionService, 'hasStoredUser').mockReturnValue(true);
    jest.spyOn(sessionService, 'loadUser').mockResolvedValue(undefined);
    jest.spyOn(sessionService, 'destroy');

    await middleware.use(req, res, next);

    expect((req as any).isAuthenticated).toEqual(false);
    expect((req as any).user).toEqual(undefined);
    expect(sessionService.destroy).toBeCalled();
    expect(next).toBeCalled();
  });
});
