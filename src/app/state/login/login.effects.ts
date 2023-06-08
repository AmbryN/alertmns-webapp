import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
  login,
  loginFailure,
  logout,
} from "./login.action";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { LoginService } from "../../services/login/login.service";
import { Router } from "@angular/router";

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.loginService.login(action.user).pipe(
          tap((tokenRes) => {
            localStorage.setItem("jwt", tokenRes.token);
          }),
          switchMap(() =>
            this.loginService.getProfile().pipe(
              map((user) => loadProfileSuccess({ user })),
              tap(() => this.router.navigateByUrl("/")),
              catchError((error) => {
                const message = this.loginService.handleError(error);
                return of(loadProfileFailure({ error: message }));
              })
            )
          ),
          catchError((error) => {
            const message = this.loginService.handleError(error);
            return of(loginFailure({ error: message }));
          })
        )
      )
    )
  );

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      switchMap(() =>
        this.loginService.getProfile().pipe(
          map((user) => loadProfileSuccess({ user })),
          catchError((error) => {
            const message = this.loginService.handleError(error);
            this.router.navigateByUrl("/login");
            return of(loadProfileFailure({ error: message }));
          })
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() => {
        this.router.navigateByUrl("/login");
        return this.loginService.logout();
      })
    )
  );
}
