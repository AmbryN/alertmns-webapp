import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { filter, map, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../state/App.state";
import { selectCurrentUser } from "../state/login/login.selectors";

@Injectable({
  providedIn: "root",
})
export class AdminGuard {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectCurrentUser).pipe(
      filter((user) => user != null),
      map((user) => {
        if (
          user != null &&
          user.roles?.find((role) => role.name == "ROLE_ADMIN") != undefined
        )
          return true;
        else return this.router.parseUrl("/");
      })
    );
  }
}
