import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthGuard } from './auth.guard';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard extends AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return super.canActivate(route, state).pipe(map((value) => !value));
  }
}
