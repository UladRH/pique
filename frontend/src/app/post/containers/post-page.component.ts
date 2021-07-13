import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Post } from '../../shared/interfaces/post.interface';
import * as fromPost from '../state/post.selectors';

@Component({
  selector: 'app-post-page',
  template: ` <app-post [post]="post$ | async"></app-post> `,
})
export class PostPageComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.post$ = this.route.data.pipe(
      mergeMap(({ post }) => this.store.select(fromPost.selectPostById(post.id))),
    );
  }
}
