import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginUserDto, Profile, RegisterUserDto, User } from '../shared/interfaces';
import { ApiService } from '../shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly api: ApiService) {}

  getLoggedInUser() {
    return this.api.get<User>('/auth/user').pipe(map(AuthService.normalize));
  }

  register(dto: RegisterUserDto) {
    return this.api.post('/auth/web/register', { ...dto }).pipe(map(AuthService.normalize));
  }

  login(dto: LoginUserDto) {
    return this.api.post('/auth/web/login', { ...dto }).pipe(map(AuthService.normalize));
  }

  logout(): Observable<undefined> {
    return this.api.post('/auth/web/logout');
  }

  private static normalize(data: User): { user: User; profile: Profile } {
    const { profile, ...user } = data;
    return { user, profile };
  }
}
