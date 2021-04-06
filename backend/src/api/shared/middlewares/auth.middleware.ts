import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { SessionService } from '../../auth/session.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly sessionService: SessionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    (req as any).isAuthenticated = false; // init

    if (this.sessionService.hasStoredUser()) {
      const user = await this.sessionService.loadUser();

      if (user) {
        (req as any).user = user;
        (req as any).isAuthenticated = true;
      } else {
        // session has nonexistent user id
        this.sessionService.destroy();
      }
    }

    next();
  }
}
