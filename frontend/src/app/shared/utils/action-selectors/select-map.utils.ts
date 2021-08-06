import { ofType } from '@ngrx/effects';
import { Action, ActionCreator, ActionType } from '@ngrx/store';
import { Observable, OperatorFunction } from 'rxjs';
import { defaultIfEmpty, map, shareReplay } from 'rxjs/operators';

export function selectMap<
  Creators extends ActionCreator[],
  Actions extends ActionType<Creators[number]>,
  Return,
  Selector extends (action: Actions) => Return,
>(...args: [...creators: Creators, selector: Selector]): OperatorFunction<Action, Return | null>;

export function selectMap<
  Creators extends ActionCreator[],
  Actions extends ActionType<Creators[number]>,
  Return,
  Selector extends (action: Actions) => Return,
>(...args: [creators: Creators, selector: Selector]): OperatorFunction<Action, Return | null>;

export function selectMap<
  Creators extends ActionCreator[],
  Actions extends ActionType<Creators[number]>,
  Return,
  Selector extends (action: Actions) => Return,
>(
  ...args: [...creators: Creators | Creators[], selector: Selector]
): OperatorFunction<Action, Return | null> {
  const selector = args.pop() as Selector;
  const creators = (args as unknown as Creators).flat();

  return function (source: Observable<Action>) {
    return source.pipe(
      ofType<Actions>(...creators),
      map(selector),
      shareReplay(1),
      defaultIfEmpty<Return | null>(null),
    );
  };
}
