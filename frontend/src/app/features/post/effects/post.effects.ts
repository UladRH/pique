import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { PostService } from '../services';
import { PostActions, PostApiActions } from '../actions';
import * as fromPost from '../reducers';

@Injectable()
export class PostEffects {
  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loaded, PostApiActions.likeSuccess, PostApiActions.unlikeSuccess),
      map(({ post }) => reduceGraph({ data: post, selector: fromPost.selectPost })),
    ),
  );

  like$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.like),
      exhaustMap(({ post }) =>
        this.postService.like(post.id).pipe(
          map((post) => PostApiActions.likeSuccess({ post })),
          catchError((error) => of(PostApiActions.likeFailure({ post, error }))),
        ),
      ),
    ),
  );

  unlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.unlike),
      exhaustMap(({ post }) =>
        this.postService.unlike(post.id).pipe(
          map((post) => PostApiActions.unlikeSuccess({ post })),
          catchError((error) => of(PostApiActions.unlikeFailure({ post, error }))),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly postService: PostService) {}
}
