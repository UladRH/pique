import { Component, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';

import { selectPending } from '@pique/frontend/shared/utils';
import { Post } from '@pique/frontend/core/interfaces';
import * as FeedActions from '@pique/frontend/feed/state/feed.actions';
import * as fromFeed from '@pique/frontend/feed/state/feed.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.posts$ = this.store.select(fromFeed.selectFeedPosts);

    this.pending$ = this.actions$.pipe(
      selectPending(
        [FeedActions.get, FeedActions.next],
        [
          FeedActions.getSuccess,
          FeedActions.getFailure,
          FeedActions.nextSuccess,
          FeedActions.nextFailure,
        ],
      ),
    );
  }

  ngOnInit() {
    this.store.dispatch(FeedActions.get());
  }

  next(_$event: IInfiniteScrollEvent) {
    this.store.dispatch(FeedActions.next());
  }
}
