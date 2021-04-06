import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { User } from '../../auth/entities/user.entity';

export const PqUser = createParamDecorator(
  <K extends keyof User>(data: K, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
