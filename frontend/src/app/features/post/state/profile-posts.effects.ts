import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  exhaustMap,
  filter,
  map,
  mergeMap,
  withLatestFrom,
} from 'rxjs/operators';

import { PostService } from '../post.service';
import * as fromPost from './post.selectors';
import * as ProfilePostsActions from './profile-posts.actions';
import * as fromProfilePosts from './profile-posts.selectors';

@Injectable()
export class ProfilePostsEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfilePostsActions.get),
      exhaustMap(({ profile }) =>
        this.postService.getForProfile(profile.id, { page: 1, perPage: 10 }).pipe(
          map((posts) => ProfilePostsActions.getSuccess({ profile, posts })),
          catchError((error) => of(ProfilePostsActions.getFailure({ error }))),
        ),
      ),
    );
  });

  getSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilePostsActions.getSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  next$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfilePostsActions.next),
      mergeMap(({ profile }) =>
        of(profile).pipe(
          withLatestFrom(this.store.select(fromProfilePosts.selectProfilePostsCount(profile))),
        ),
      ),
      filter(([_profile, count]) => count > 0),
      concatMap(([profile, count]) =>
        this.postService.getForProfile(profile.id, { page: count / 10 + 1, perPage: 10 }).pipe(
          map((posts) => ProfilePostsActions.nextSuccess({ profile, posts })),
          catchError((error) => of(ProfilePostsActions.nextFailure({ error }))),
        ),
      ),
    );
  });

  nextSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilePostsActions.nextSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService,
  ) {}
}
