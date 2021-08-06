import { Action, ActionCreator } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { defaultIfEmpty, map, shareReplay } from 'rxjs/operators';

import { mapActions } from '@pique/frontend/shared/utils/action-selectors/map-actions.utils';

export function selectPending(
  beginOn: ActionCreator[],
  endOn: ActionCreator[],
): OperatorFunction<Action, boolean> {
  return function <V extends Action>(source: Observable<V>) {
    return source.pipe(
      mapActions({
        true: beginOn,
        false: endOn,
      }),
      map((value) => value === 'true'),
      shareReplay(1),
      defaultIfEmpty(true),
    );
  };
}
