import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { User } from '../../models/User';
import { selectCurrentUser } from '../../state/login/login.selectors';
import { loadProfile } from '../../state/login/login.action';

@Injectable({
  providedIn: 'root',
})
export class MemberGuard  {
  currentUser: User | null = null;
  constructor(private store: Store<AppState>, private router: Router) {
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
    const channelId = Number(route.paramMap.get('id'));
    return this.store.select(selectCurrentUser).pipe(
      filter((user) => user != null),
      map((user) => {
        if (
          user != null &&
          user.channels!.filter((channel) => channel.id === channelId).length >
            0
        ) {
          return true;
        } else return this.router.parseUrl('/');
      })
    );
  }
}
