import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../../core/interfaces';

@Component({
  template: `
    <ng-container *ngIf="post$ | async as post">
      <app-post-section [post]="post"></app-post-section>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPageComponent {
  post$: Observable<Post>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
    this.post$ = this.route.data.pipe(map((data) => data.post));
  }
}
