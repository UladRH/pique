import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@pique/frontend/core/services';
import { PaginationQueryDto, Post } from '@pique/frontend/core/interfaces';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private readonly api: ApiService) {}

  feed({ page, perPage }: PaginationQueryDto): Observable<Post[]> {
    return this.api.get('/feed', { page, perPage });
  }
}
