import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../shared/interfaces/post.interface';
import { ApiService } from '../shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private readonly api: ApiService) {}

  private static normalizeNested(data: Post) {
    return { ...data, profileId: data.profile.id };
  }

  get(id: Post['id']): Observable<Post> {
    return this.api.get(`/posts/${id}`).pipe(map(PostService.normalizeNested));
  }
}
