import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../state/App.state';
import { User } from '../models/User';
import { selectCurrentUser } from '../state/login/login.selectors';
import { loadProfile } from '../state/login/login.action';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  currentUser: User | null = null;
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectCurrentUser).pipe(
      filter((user) => user != null),
      map((user) => {
        if (
          user != null &&
          user.roles!.find((role) => role == 'ROLE_ADMIN') != undefined
        )
          return true;
        else return this.router.parseUrl('/');
      })
    );
  }
}
