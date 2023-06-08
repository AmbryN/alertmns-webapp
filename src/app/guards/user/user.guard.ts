import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../state/App.state";
import { selectCurrentUser } from "../../state/login/login.selectors";
import { User } from "../../models/User";

@Injectable({
  providedIn: "root",
})
export class UserGuard {
  currentUser: User | null = null;
  constructor(private router: Router, private store: Store<AppState>) {
    this.store
      .select(selectCurrentUser)
      .subscribe((user) => (this.currentUser = user));
  }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectCurrentUser).pipe(
      filter((user) => user != null),
      map(() => {
        return true;
      })
    );
  }
}
