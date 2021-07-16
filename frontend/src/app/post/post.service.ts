import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../shared/interfaces';
import { ApiService } from '../shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private readonly api: ApiService) {}

  static normalizeNested(data: Post) {
    return { ...data, profileId: data.profile.id };
  }

  get(id: Post['id']): Observable<Post> {
    return this.api.get(`/posts/${id}`).pipe(map(PostService.normalizeNested));
  }

  like(id: Post['id']): Observable<Post> {
    return this.api.put(`/posts/${id}/liked`).pipe(map(PostService.normalizeNested));
  }

  unlike(id: Post['id']): Observable<Post> {
    return this.api.delete(`/posts/${id}/liked`).pipe(map(PostService.normalizeNested));
  }
}
