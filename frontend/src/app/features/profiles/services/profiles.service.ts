import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { concatAll, last, map } from 'rxjs/operators';

import { dataUriToBlob } from '../../../shared/utils/data-uri.utils';
import { ApiService } from '../../../core/services/api.service';
import { Profile, ProfileEditFormDto, ProfileUpdateDto } from '../../../core/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfilesService {
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

  update(id: Profile['id'], changes: ProfileEditFormDto): Observable<Profile> {
    const requests = [];

    if ('displayName' in changes || 'bio' in changes) {
      requests.push(this.updateDetails(id, changes));
    }

    if (changes.avatarUri) {
      requests.push(this.updateAvatar(id, changes.avatarUri));
    } else if (changes.avatarUri === null) {
      requests.push(this.removeAvatar(id));
    }

    if (changes.headerUri) {
      requests.push(this.updateHeader(id, changes.headerUri));
    } else if (changes.headerUri === null) {
      requests.push(this.removeHeader(id));
    }

    return from(requests).pipe(
      concatAll(),
      last(),
      map((profile: Profile) => profile),
    );
  }

  updateDetails(id: Profile['id'], dto: ProfileUpdateDto): Observable<Profile> {
    return this.api.patch(`/profiles/${id}`, {
      displayName: dto.displayName,
      bio: dto.bio,
    });
  }

  updateAvatar(id: Profile['id'], dataUriImage: string): Observable<Profile> {
    const formData = new FormData();
    formData.append('file', dataUriToBlob(dataUriImage));

    return this.api.put(`/profiles/${id}/avatar`, formData);
  }

  removeAvatar(id: Profile['id']): Observable<Profile> {
    return this.api.delete(`/profiles/${id}/avatar`);
  }

  updateHeader(id: Profile['id'], dataUriImage: string): Observable<Profile> {
    const formData = new FormData();
    formData.append('file', dataUriToBlob(dataUriImage));

    return this.api.put(`/profiles/${id}/header`, formData);
  }

  removeHeader(id: Profile['id']): Observable<Profile> {
    return this.api.delete(`/profiles/${id}/header`);
  }
}
