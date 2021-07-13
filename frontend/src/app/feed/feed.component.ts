import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from '../shared/interfaces/post.interface';
import * as FeedActions from './state/feed.actions';
import * as fromFeed from './state/feed.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FeedActions.get());

    this.posts$ = this.store.select(fromFeed.selectFeedPosts);
  }
}
