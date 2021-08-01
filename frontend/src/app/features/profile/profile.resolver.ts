import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { ProfileService } from './services';
import { Profile } from '../../core/interfaces';
import * as ProfileActions from './actions/profile.actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile | null> {
  constructor(
    private readonly store: Store,
    private readonly profileService: ProfileService,
    private readonly router: Router,
  ) {}

  // navigation = this.router.getCurrentNavigation();

  requestByIdOrScreenName(id?: string, screenName?: string) {
    if (id) {
      return this.profileService.getById(id);
    } else if (screenName) {
      return this.profileService.getByScreenName(screenName);
    }

    return throwError(EMPTY);
  }

  getFromApi(id?: string, screenName?: string): Observable<Profile> {
    return this.requestByIdOrScreenName(id, screenName).pipe(
      tap((profile) => this.store.dispatch(ProfileActions.loaded({ profile }))),
    );
  }

  // getFromStore(id: string): Observable<Profile> {
  //   return this.store.select(fromProfile.getProfileById(id)).pipe(
  //     take(1),
  //     filter((value) => !!value),
  //   );
  // }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile | null> {
    // const id = this.navigation.extras.state?.['profileId'];
    const id = undefined;
    const screenName = route.params['screenName'];

    return this.getFromApi(id, screenName).pipe(
      catchError(() => {
        this.router.navigate(['/404']);
        return of(null);
      }),
    );
  }
}
