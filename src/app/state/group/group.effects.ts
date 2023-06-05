import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addGroup,
  addGroupFailure,
  addGroupSuccess,
  addUserToGroup,
  addUserToGroupFailure,
  addUserToGroupSuccess,
  loadGroup,
  loadGroupFailure,
  loadGroups,
  loadGroupsFailure,
  loadGroupsSuccess,
  loadGroupSuccess,
  removeUserFromGroup,
  removeUserFromGroupFailure,
  removeUserFromGroupSuccess,
} from './group.action';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { GroupService } from '../../services/group/group.service';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private groupService: GroupService
  ) {}

  loadGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroups),
      switchMap((action) =>
        from(
          this.groupService.getGroups().pipe(
            map((groups) => loadGroupsSuccess({ groups })),
            catchError((error) => of(loadGroupsFailure({ error })))
          )
        )
      )
    )
  );

  loadGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGroup),
      switchMap((action) =>
        this.groupService.getGroup(action.groupId).pipe(
          map((group) => loadGroupSuccess({ group })),
          catchError((error) => of(loadGroupFailure({ error })))
        )
      )
    )
  );

  addGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addGroup),
      switchMap((action) =>
        this.groupService.addGroup(action.group).pipe(
          map((group) => addGroupSuccess({ group })),
          catchError((error) => of(addGroupFailure({ error })))
        )
      )
    )
  );

  addUserToGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserToGroup),
      switchMap((action) =>
        this.groupService.addMember(action.groupId, action.users).pipe(
          map((group) => addUserToGroupSuccess({ group })),
          catchError((error) => of(addUserToGroupFailure({ error })))
        )
      )
    )
  );

  removeUserFromGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUserFromGroup),
      switchMap((action) =>
        this.groupService.removeMember(action.groupId, action.userId).pipe(
          map((group) => removeUserFromGroupSuccess({ group })),
          catchError((error) => of(removeUserFromGroupFailure({ error })))
        )
      )
    )
  );
}
