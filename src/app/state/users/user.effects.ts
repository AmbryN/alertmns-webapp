import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './user.action';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap((action) =>
        this.userService.getUsers().pipe(
          delay(2000),
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map((_) => deleteUserSuccess({ userId: action.userId })),
          catchError((error) => of(deleteUserFailure({ error })))
        )
      )
    )
  );
}
