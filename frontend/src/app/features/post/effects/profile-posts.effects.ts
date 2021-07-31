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

import { PostService } from '../services';
import { PostApiActions, ProfilePostsActions } from '../actions';
import * as fromPost from '../reducers';

@Injectable()
export class ProfilePostsEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfilePostsActions.get),
      exhaustMap(({ profile }) =>
        this.postService.getForProfile(profile.id, { page: 1, perPage: 10 }).pipe(
          map((posts) => PostApiActions.getSuccess({ profile, posts })),
          catchError((error) => of(PostApiActions.getFailure({ error }))),
        ),
      ),
    );
  });

  getSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostApiActions.getSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  next$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfilePostsActions.next),
      mergeMap(({ profile }) =>
        of(profile).pipe(
          withLatestFrom(this.store.select(fromPost.selectProfilePostsCount(profile))),
        ),
      ),
      filter(([_profile, count]) => count > 0),
      concatMap(([profile, count]) =>
        this.postService.getForProfile(profile.id, { page: count / 10 + 1, perPage: 10 }).pipe(
          map((posts) => PostApiActions.nextSuccess({ profile, posts })),
          catchError((error) => of(PostApiActions.nextFailure({ error }))),
        ),
      ),
    );
  });

  nextSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostApiActions.nextSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService,
  ) {}
}
