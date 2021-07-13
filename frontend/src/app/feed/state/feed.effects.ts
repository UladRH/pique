import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { FeedService } from '../feed.service';
import * as fromPost from '../../post/state/post.selectors';
import * as FeedActions from './feed.actions';

@Injectable()
export class FeedEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedActions.get),
      concatMap(() =>
        this.feedService.feed({ page: 1, perPage: 20 }).pipe(
          map((posts) => FeedActions.getSuccess({ posts })),
          catchError((error) => of(FeedActions.getFailure({ error }))),
        ),
      ),
    );
  });

  getSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.getSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly feedService: FeedService) {}
}
