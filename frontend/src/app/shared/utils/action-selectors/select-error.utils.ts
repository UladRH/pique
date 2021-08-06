import { Action, ActionCreator, ActionType, Creator } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';

import { selectMap } from './select-map.utils';

export function selectError<
  Creators extends ActionCreator<any, Creator<any, { error: Error }>>[],
  Actions extends ActionType<Creators[number]>,
  Error,
>(...creators: Creators): OperatorFunction<Action, Error | null> {
  return function (source: Observable<Action>) {
    return source.pipe(selectMap(creators, (action) => action.error));
  };
}
