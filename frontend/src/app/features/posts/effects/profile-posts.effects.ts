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

import { PostsService } from '@pique/frontend/posts/services';
import { PostsApiActions, ProfilePostsActions } from '@pique/frontend/posts/actions';
import * as fromPost from '@pique/frontend/posts/reducers';

@Injectable()
export class ProfilePostsEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfilePostsActions.get),
      exhaustMap(({ profile }) =>
        this.postsService.getForProfile(profile.id, { page: 1, perPage: 10 }).pipe(
          map((posts) => PostsApiActions.getSuccess({ profile, posts })),
          catchError((error) => of(PostsApiActions.getFailure({ error }))),
        ),
      ),
    );
  });

  getSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsApiActions.getSuccess),
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
        this.postsService.getForProfile(profile.id, { page: count / 10 + 1, perPage: 10 }).pipe(
          map((posts) => PostsApiActions.nextSuccess({ profile, posts })),
          catchError((error) => of(PostsApiActions.nextFailure({ error }))),
        ),
      ),
    );
  });

  nextSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsApiActions.nextSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postsService: PostsService,
  ) {}
}
