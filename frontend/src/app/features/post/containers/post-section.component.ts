import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Post } from '../../../core/interfaces';
import * as fromPost from '../state/post.selectors';

@Component({
  selector: 'app-post-section',
  template: `<app-post-details [post]="post$ | async"></app-post-details>`,
})
export class PostSectionComponent {
  post$!: Observable<Post>;

  constructor(private readonly store: Store) {}

  @Input() set post(post: Post) {
    this.post$ = this.store.select(fromPost.selectPostById(post.id)) as Observable<Post>;
  }
}
