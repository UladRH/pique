import { ofType } from '@ngrx/effects';
import { Action, ActionCreator } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

export function equalsAction(creator: Action, action: Action) {
  return creator.type === action.type;
}

export function equalsSomeActions(creator: Action, actions: Action[]) {
  return actions.some((action) => equalsAction(creator, action));
}

export function mapActions(args: Record<string | number | symbol, ActionCreator[]>) {
  const all = Object.values(args).flat();

  return function <V extends Action>(source: Observable<V>) {
    return source.pipe(
      ofType<Action>(...all),
      map((current) => {
        for (const [value, actions] of Object.entries(args)) {
          if (equalsSomeActions(current, actions)) {
            return value;
          }
        }

        return throwError('Cannot match action');
      }),
    );
  };
}
