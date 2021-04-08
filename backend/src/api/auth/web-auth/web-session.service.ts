import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { User } from '../entities/user.entity';

export const CURRENT_USER_ID_KEY = 'currentUserId';

@Injectable({ scope: Scope.REQUEST })
export class WebSessionService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
    private readonly authService: AuthService,
  ) {}

  storeUser(user: User): void {
    this.request.session[CURRENT_USER_ID_KEY] = user.id;
  }

  loadUser(): Promise<User | undefined> {
    if (!this.hasStoredUser()) {
      return Promise.resolve(undefined);
    }

    const userId = this.request.session[CURRENT_USER_ID_KEY];
    return this.authService.findById(userId);
  }

  hasStoredUser(): boolean {
    return this.request.session[CURRENT_USER_ID_KEY] !== undefined;
  }

  destroy(): void {
    this.request.session = null;
  }
}
