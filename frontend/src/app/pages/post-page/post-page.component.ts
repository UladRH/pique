import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Post, Profile } from '../../core/interfaces';
import * as PostActions from '../../features/post/state/post.actions';
import * as fromPost from '../../features/post/state/post.selectors';
import * as ProfileActions from '../../features/profile/state/profile.actions';

@Component({
  selector: 'app-post-page',
  template: `
    <ng-container *ngIf="post$ | async as post">
      <app-post
        [post]="post"
        (liked)="like($event)"
        (unliked)="unlike($event)"
        (followed)="follow($event)"
        (unfollowed)="unfollow($event)"
      ></app-post>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {
  post$: Observable<Post>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
    this.post$ = this.route.data.pipe(
      mergeMap(
        ({ post }) => this.store.select(fromPost.selectPostById(post.id)) as Observable<Post>,
      ),
    );
  }

  like(post: Post) {
    this.store.dispatch(PostActions.like({ post }));
  }

  unlike(post: Post) {
    this.store.dispatch(PostActions.unlike({ post }));
  }

  follow(profile: Profile) {
    this.store.dispatch(ProfileActions.follow({ profile }));
  }

  unfollow(profile: Profile) {
    this.store.dispatch(ProfileActions.unfollow({ profile }));
  }
}
