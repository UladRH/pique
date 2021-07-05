import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Profile } from '../shared/interfaces';
import { ApiService } from '../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private api: ApiService) {}

  getById(id: Profile['id']): Observable<Profile> {
    return this.api.get(`/profiles/${id}`);
  }

  getByScreenName(screenName: Profile['screenName']): Observable<Profile> {
    return this.api.get(`/profiles`, { screenName });
  }

  follow(id: Profile['id']): Observable<Profile> {
    return this.api.put(`/profiles/${id}/followed`);
  }

  unfollow(id: Profile['id']): Observable<Profile> {
    return this.api.delete(`/profiles/${id}/followed`);
  }
}
