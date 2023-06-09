import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../App.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  addUser,
  addUserFailure,
  addUserSuccess,
  batchUploadUsers,
  batchUploadUsersFailure,
  batchUploadUsersSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUser,
  loadUserFailure,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  loadUserSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from "./user.action";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../../services/user/user.service";
import { FileService } from "../../services/file/file.service";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private fileService: FileService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => {
            const message = this.userService.handle(error);
            return of(loadUsersFailure({ error: message }));
          })
        )
      )
    )
  );

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      switchMap((action) =>
        this.userService.getUser(action.userId).pipe(
          map((user) => loadUserSuccess({ user })),
          catchError((error) => {
            const message = this.userService.handle(error);
            return of(loadUserFailure({ error: message }));
          })
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      switchMap((action) =>
        this.userService.addUser(action.user).pipe(
          map((user) => addUserSuccess({ user })),
          catchError((error) => {
            const message = this.userService.handle(error);
            return of(addUserFailure({ error: message }));
          })
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      switchMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map((user) => updateUserSuccess({ user })),
          catchError((error) => {
            const message = this.userService.handle(error);
            return of(updateUserFailure({ error: message }));
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      switchMap((action) =>
        this.userService.deleteUser(action.userId).pipe(
          map(() => deleteUserSuccess({ userId: action.userId })),
          catchError((error) => {
            const message = this.userService.handle(error);
            return of(deleteUserFailure({ error: message }));
          })
        )
      )
    )
  );

  batchUploadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(batchUploadUsers),
      switchMap((action) =>
        this.fileService.upload(action.file).pipe(
          map((users) => batchUploadUsersSuccess({ users })),
          catchError((error) => of(batchUploadUsersFailure({ error })))
        )
      )
    )
  );
}
