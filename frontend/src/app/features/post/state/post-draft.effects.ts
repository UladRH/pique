import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { MediaAttachmentsService } from '../media-attachments.service';
import { PostService } from '../post.service';
import * as PostDraftActions from './post-draft.actions';
import * as fromPostDraft from './post-draft.selectors';
import * as PostActions from './post.actions';

@Injectable()
export class PostDraftEffects {
  uploadMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostDraftActions.uploadMedia),
      exhaustMap(({ file }) =>
        this.mediaAttachmentsService.upload(file).pipe(
          map((mediaAttachment) => PostDraftActions.uploadMediaSuccess({ mediaAttachment })),
          catchError((error) => of(PostDraftActions.uploadMediaFailure({ error }))),
        ),
      ),
    ),
  );

  publish$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostDraftActions.publish),
      withLatestFrom(this.store.select(fromPostDraft.selectPostDraft)),
      exhaustMap(([_action, dto]) =>
        this.postService.create(dto).pipe(
          map((post) => PostDraftActions.publishSuccess({ post })),
          catchError((error) => of(PostDraftActions.publishFailure({ error }))),
        ),
      ),
    ),
  );

  publishSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostDraftActions.publishSuccess),
      switchMap(({ post }) => [PostActions.loaded({ post })]),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly postService: PostService,
    private readonly mediaAttachmentsService: MediaAttachmentsService,
  ) {}
}
