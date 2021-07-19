import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PaginationQueryDto, Post } from '../shared/interfaces';
import { ApiService } from '../shared/services/api.service';

@Injectable({ providedIn: 'root' })
export class FeedService {
  constructor(private readonly api: ApiService) {}

  feed({ page, perPage }: PaginationQueryDto): Observable<Post[]> {
    return this.api.get('/feed', { page, perPage });
  }
}
