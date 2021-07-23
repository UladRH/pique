import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { LoginUserDto, RegisterUserDto, User } from '../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly api: ApiService) {}

  getLoggedInUser(): Observable<User> {
    return this.api.get('/auth/user');
  }

  register(dto: RegisterUserDto): Observable<User> {
    return this.api.post('/auth/web/register', { ...dto });
  }

  login(dto: LoginUserDto): Observable<User> {
    return this.api.post('/auth/web/login', { ...dto });
  }

  logout(): Observable<undefined> {
    return this.api.post('/auth/web/logout');
  }
}
