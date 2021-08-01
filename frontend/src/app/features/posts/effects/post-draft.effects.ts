import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, withLatestFrom } from 'rxjs/operators';

import { MediaAttachmentsService, PostsService } from '@pique/frontend/posts/services';
import {
  MediaAttachmentsApiActions,
  PostDraftActions,
  PostsApiActions,
} from '@pique/frontend/posts/actions';
import * as fromPost from '@pique/frontend/posts/reducers';

@Injectable()
export class PostDraftEffects {
  uploadMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostDraftActions.uploadMediaAttachment),
      exhaustMap(({ file }) =>
        this.mediaAttachmentsService.upload(file).pipe(
          map((mediaAttachment) => MediaAttachmentsApiActions.uploadSuccess({ mediaAttachment })),
          catchError((error) => of(MediaAttachmentsApiActions.uploadFailure({ error }))),
        ),
      ),
    ),
  );

  publish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostDraftActions.publish),
      withLatestFrom(this.store.select(fromPost.selectDraftDto)),
      exhaustMap(([_action, dto]) =>
        this.postsService.create(dto).pipe(
          map((post) => PostsApiActions.publishSuccess({ post })),
          catchError((error) => of(PostsApiActions.publishFailure({ error }))),
        ),
      ),
    ),
  );

  publishSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsApiActions.publishSuccess),
      map(({ post }) => reduceGraph({ data: post, selector: fromPost.selectPost })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postsService: PostsService,
    private readonly mediaAttachmentsService: MediaAttachmentsService,
  ) {}
}
