import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/App.state';
import { selectCurrentUser } from '../../state/login/login.selectors';
import { User } from '../../models/User';
import { loadProfile } from '../../state/login/login.action';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  currentUser: User | null = null;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
  }
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
        return true;
      })
    );
  }
}
