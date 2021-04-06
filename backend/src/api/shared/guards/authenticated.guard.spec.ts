import { createMock } from '@golevelup/ts-jest';
import { ExecutionContext, HttpException } from '@nestjs/common';

import { AuthenticatedGuard } from './authenticated.guard';

describe('AuthenticatedGuard', () => {
  let guard: AuthenticatedGuard;

  beforeEach(() => {
    guard = new AuthenticatedGuard();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should pass if req.isAuthenticated = true', () => {
    const context = createMock<ExecutionContext>();
    (context.switchToHttp().getRequest() as any).isAuthenticated = true;

    expect(guard.canActivate(context)).toEqual(true);
  });

  it('should throw HttpException if req.isAuthenticated = false', () => {
    const context = createMock<ExecutionContext>();
    (context.switchToHttp().getRequest() as any).isAuthenticated = false;

    expect(() => guard.canActivate(context)).toThrowError(HttpException);
  });
});
