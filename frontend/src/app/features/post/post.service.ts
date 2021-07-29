import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { PaginationQueryDto, Post, Profile } from '../../core/interfaces';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private readonly api: ApiService) {}

  get(id: Post['id']): Observable<Post> {
    return this.api.get(`/posts/${id}`);
  }

  like(id: Post['id']): Observable<Post> {
    return this.api.put(`/posts/${id}/liked`);
  }

  unlike(id: Post['id']): Observable<Post> {
    return this.api.delete(`/posts/${id}/liked`);
  }

  getForProfile(
    profileId: Profile['id'],
    { page, perPage }: PaginationQueryDto,
  ): Observable<Post[]> {
    return this.api.get(`/profiles/${profileId}/posts`, { page, perPage });
  }
}
