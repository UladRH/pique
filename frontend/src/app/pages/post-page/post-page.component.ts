import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Post } from '../../core/interfaces';
import * as fromPost from '../../features/post/state/post.selectors';

@Component({
  selector: 'app-post-page',
  template: `
    <ng-container *ngIf="post$ | async as post">
      <app-post [post]="post"></app-post>
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
}
