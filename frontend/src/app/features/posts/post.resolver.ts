import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { PostsService } from './services';
import { Post } from '../../core/interfaces';
import { PostActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<Post | null> {
  constructor(
    private readonly store: Store,
    private readonly postService: PostsService,
    private readonly router: Router,
  ) {}

  getFromApi(id: string) {
    return this.postService
      .get(id)
      .pipe(tap((post) => this.store.dispatch(PostActions.loaded({ post }))));
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post | null> {
    return this.getFromApi(route.params['id']).pipe(
      catchError(() => {
        this.router.navigate(['/404']);
        return of(null);
      }),
    );
  }
}
