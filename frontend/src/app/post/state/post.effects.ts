import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { reduceGraph } from 'ngrx-entity-relationship';
import { map } from 'rxjs/operators';

import * as PostActions from './post.actions';
import * as fromPost from './post.selectors';

@Injectable()
export class PostEffects {
  loaded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loaded),
      map(({ post }) => reduceGraph({ data: post, selector: fromPost.selectPost })),
    ),
  );

  constructor(private actions$: Actions) {}
}
