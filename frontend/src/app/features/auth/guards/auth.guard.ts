import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { AuthGuardsActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      filter((value) => value !== null),
      take(1),
      map((loggedIn) => {
        if (loggedIn) {
          return true;
        } else {
          this.store.dispatch(AuthGuardsActions.authRedirect());
          return false;
        }
      }),
    );
  }
}
