import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs/operators';

import { AuthGuardsActions } from '../actions';
import * as fromAuth from '../reducers';

@Directive({
  selector: '[appClickLoggedIn]',
})
export class ClickLoggedInDirective {
  @Output() appClickLoggedIn = new EventEmitter<MouseEvent>();

  constructor(private readonly store: Store) {}

  @HostListener('click', ['$event'])
  onClick($event: MouseEvent) {
    this.store
      .select(fromAuth.selectLoggedIn)
      .pipe(
        filter((value) => value !== null),
        take(1),
      )
      .subscribe((value) => {
        if (value) {
          this.appClickLoggedIn.emit($event);
        } else {
          this.store.dispatch(AuthGuardsActions.authRequired());
        }
      });
  }
}
