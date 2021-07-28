import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Post } from '../../../../core/interfaces';

@Component({
  selector: 'app-post-list',
  template: `
    <ng-container *ngFor="let post of posts">
      <app-post-list-item [post]="post"></app-post-list-item>
    </ng-container>
  `,
})
export class PostListComponent {
  @Input() posts: Post[] = [];

  constructor(private readonly store: Store) {}
}
