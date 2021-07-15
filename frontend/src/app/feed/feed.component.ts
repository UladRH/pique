import { Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../shared/interfaces/post.interface';
import * as FeedActions from './state/feed.actions';
import * as fromFeed from './state/feed.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;

  pending$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {}

  ngOnInit(): void {
    this.store.dispatch(FeedActions.get());

    this.posts$ = this.store.select(fromFeed.selectFeedPosts);

    this.pending$ = this.actions$.pipe(
      ofType(FeedActions.next, FeedActions.nextSuccess, FeedActions.nextFailure),
      map((action) => {
        return action.type == FeedActions.next.type;
      }),
    );
  }

  next($event) {
    this.store.dispatch(FeedActions.next());
  }
}
