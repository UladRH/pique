import { Component, Input, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post, Profile } from '../../../core/interfaces';
import { PostsApiActions, ProfilePostsActions } from '../actions';
import * as fromPost from '../reducers';

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
  gat$: any;
  pending$: Observable<boolean>;

  @Input() profile!: Profile;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.pending$ = this.actions$.pipe(
      ofType(ProfilePostsActions.next, PostsApiActions.nextSuccess, PostsApiActions.nextFailure),
      map((action) => {
        return action.type == ProfilePostsActions.next.type;
      }),
    );
  }
  ngOnInit() {
    this.posts$ = this.store.select(fromPost.selectProfilePosts(this.profile));
    this.gat$ = this.store.select(fromPost.selectProfilePostsIds(this.profile));

    this.store.dispatch(ProfilePostsActions.get({ profile: this.profile }));
  }

  next(_$event: IInfiniteScrollEvent) {
    this.store.dispatch(ProfilePostsActions.next({ profile: this.profile }));
  }
}
