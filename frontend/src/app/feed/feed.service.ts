import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginationQueryDto } from '../shared/interfaces/pagination.interface';
import { Post } from '../shared/interfaces/post.interface';
import { ApiService } from '../shared/services/api.service';
import { PostService } from '../post/post.service';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private readonly api: ApiService, private readonly store: Store) {}

  static normalizeNested(posts: Post[]): Post[] {
    return posts.map((post) => PostService.normalizeNested(post));
  }

  feed({ page, perPage }: PaginationQueryDto): Observable<Post[]> {
    return this.api.get('/feed', { page, perPage }).pipe(map(FeedService.normalizeNested));
  }
}
