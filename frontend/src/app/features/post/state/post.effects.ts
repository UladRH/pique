import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { PostService } from '../post.service';
import * as PostActions from './post.actions';
import * as fromPost from './post.selectors';

@Injectable()
export class PostEffects {
  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loaded, PostActions.likeSuccess, PostActions.unlikeSuccess),
      map(({ post }) => reduceGraph({ data: post, selector: fromPost.selectPost })),
    ),
  );

  like$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.like),
      exhaustMap(({ post }) =>
        this.postService.like(post.id).pipe(
          map((post) => PostActions.likeSuccess({ post })),
          catchError((error) => of(PostActions.likeFailure({ post, error }))),
        ),
      ),
    ),
  );

  unlike$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.unlike),
      exhaustMap(({ post }) =>
        this.postService.unlike(post.id).pipe(
          map((post) => PostActions.unlikeSuccess({ post })),
          catchError((error) => of(PostActions.unlikeFailure({ post, error }))),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly postService: PostService) {}
}
