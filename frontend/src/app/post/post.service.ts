import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '../shared/interfaces';
import { ApiService } from '../shared/services/api.service';

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
}
