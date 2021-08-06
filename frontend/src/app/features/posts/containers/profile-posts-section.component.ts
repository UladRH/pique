import { Component, Input, OnInit } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';

import { selectPending } from '@pique/frontend/shared/utils/action-selectors/select-pending.utils';
import { Post, Profile } from '@pique/frontend/core/interfaces';
import { PostsApiActions, ProfilePostsActions } from '@pique/frontend/posts/actions';
import * as fromPost from '@pique/frontend/posts/reducers';

@Component({
  selector: 'app-profile-posts-section',
  template: `
    <div class="container container-max-width-md py-5">
      <div (scrolled)="next($event)" [infiniteScrollDistance]="1" infiniteScroll>
        <app-post-list [posts]="(posts$ | async) ?? []"></app-post-list>
      </div>

      <div *ngIf="!!(pending$ | async)" class="text-center p-5">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  `,
})
export class ProfilePostsSectionComponent implements OnInit {
  posts$!: Observable<Post[]>;
  pending$: Observable<boolean>;

  @Input() profile!: Profile;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.pending$ = this.actions$.pipe(
      selectPending(
        [ProfilePostsActions.get, ProfilePostsActions.next],
        [
          PostsApiActions.getSuccess,
          PostsApiActions.getFailure,
          PostsApiActions.nextSuccess,
          PostsApiActions.nextFailure,
        ],
      ),
    );
  }

  ngOnInit() {
    this.posts$ = this.store.select(fromPost.selectProfilePosts(this.profile));

    this.store.dispatch(ProfilePostsActions.get({ profile: this.profile }));
  }

  next(_$event: IInfiniteScrollEvent) {
    this.store.dispatch(ProfilePostsActions.next({ profile: this.profile }));
  }
}
