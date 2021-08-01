import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { PostsService } from '../services';
import { PostActions, PostsApiActions } from '../actions';
import * as fromPost from '../reducers';

@Injectable()
export class PostEffects {
  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loaded, PostsApiActions.likeSuccess, PostsApiActions.unlikeSuccess),
      map(({ post }) => reduceGraph({ data: post, selector: fromPost.selectPost })),
    ),
  );

  like$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.like),
      exhaustMap(({ post }) =>
        this.postsService.like(post.id).pipe(
          map((post) => PostsApiActions.likeSuccess({ post })),
          catchError((error) => of(PostsApiActions.likeFailure({ post, error }))),
        ),
      ),
    ),
  );

  unlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.unlike),
      exhaustMap(({ post }) =>
        this.postsService.unlike(post.id).pipe(
          map((post) => PostsApiActions.unlikeSuccess({ post })),
          catchError((error) => of(PostsApiActions.unlikeFailure({ post, error }))),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly postsService: PostsService) {}
}
