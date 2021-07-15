import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { reduceGraph } from 'ngrx-entity-relationship';
import { of } from 'rxjs';
import { catchError, concatMap, filter, map, withLatestFrom } from 'rxjs/operators';

import { FeedService } from '../feed.service';
import * as fromPost from '../../post/state/post.selectors';
import * as FeedActions from './feed.actions';
import * as fromFeed from './feed.selectors';

@Injectable()
export class FeedEffects {
  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedActions.get),
      withLatestFrom(this.store.select(fromFeed.selectPagination)),
      map(([action, pagination]) => pagination),
      concatMap(({ perPage }) =>
        this.feedService.feed({ page: 1, perPage }).pipe(
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

  next$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedActions.next),
      withLatestFrom(this.store.select(fromFeed.selectPagination)),
      map(([action, pagination]) => pagination),
      filter(({ page }) => page !== null),
      concatMap(({ page, perPage }) =>
        this.feedService.feed({ page: page + 1, perPage }).pipe(
          map((posts) => FeedActions.nextSuccess({ posts })),
          catchError((error) => of(FeedActions.nextFailure({ error }))),
        ),
      ),
    );
  });

  nextSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FeedActions.nextSuccess),
      map(({ posts }) => reduceGraph({ data: posts, selector: fromPost.selectPosts })),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly feedService: FeedService,
  ) {}
}
