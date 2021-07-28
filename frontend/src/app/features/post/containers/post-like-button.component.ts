import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from '../../../core/interfaces';
import * as PostActions from '../state/post.actions';

@Component({
  selector: 'app-post-like-button',
  template: `
    <ng-container *ngIf="post">
      <div class="input-group">
        <button
          (appClickLoggedIn)="toggleLiked()"
          class="btn"
          [class.btn-outline-danger]="post.liked"
          [class.btn-danger]="!post.liked"
        >
          {{ post.liked ? 'Unlike' : 'Like' }}
        </button>

        <div class="input-group-text bg-light text-danger border-danger">{{ post.likesCount }}</div>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostLikeButtonComponent {
  constructor(private readonly store: Store) {}

  toggleLiked() {
    const post = this.post;

    if (post) {
      if (post.liked) {
        this.store.dispatch(PostActions.unlike({ post }));
      } else {
        this.store.dispatch(PostActions.like({ post }));
      }
    }
  }

  @Input() post: Post | null = null;
}