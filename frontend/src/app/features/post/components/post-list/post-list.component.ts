import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from '../../../../core/interfaces';
import * as PostActions from '../../state/post.actions';

@Component({
  selector: 'app-post-list',
  template: `
    <ng-container *ngFor="let post of posts">
      <app-post-list-item
        [post]="post"
        (liked)="like($event)"
        (unliked)="unlike($event)"
      ></app-post-list-item>
    </ng-container>
  `,
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  constructor(private readonly store: Store) {}

  like(post: Post) {
    this.store.dispatch(PostActions.like({ post }));
  }

  unlike(post: Post) {
    this.store.dispatch(PostActions.unlike({ post }));
  }
}
