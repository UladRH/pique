import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Profile } from '../shared/interfaces';
import { ProfileService } from './profile.service';
import * as ProfileActions from './state/profile.actions';
import { ProfileState } from './state/profile.reducer';

@Injectable({
  providedIn: 'root',
})
export class ProfileResolver implements Resolve<Profile['id']> {
  constructor(
    private readonly store: Store<ProfileState>,
    private readonly profileService: ProfileService,
    private readonly router: Router,
  ) {}

  // navigation = this.router.getCurrentNavigation();

  requestByIdOrScreenName(id: string, screenName: string) {
    if (id) {
      return this.profileService.getById(id);
    } else if (screenName) {
      return this.profileService.getByScreenName(screenName);
    }
  }

  getFromApi(id: string, screenName: string): Observable<Profile> {
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

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Profile['id']> {
    // const id = this.navigation.extras.state?.['profileId'];
    const id = undefined;
    const screenName = route.params['screenName'];

    return this.getFromApi(id, screenName).pipe(
      map((profile) => profile.id),
      catchError(() => {
        // this.router.navigate(['/404'], { skipLocationChange: true });
        return of(null);
      }),
    );
  }
}
