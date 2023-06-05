import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../App.state';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadRoles, loadRolesFailure, loadRolesSuccess } from './role.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
import { RoleService } from '../../services/role/role.service';

@Injectable()
export class RoleEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private roleService: RoleService
  ) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      switchMap((action) =>
        from(
          this.roleService.getRoles().pipe(
            map((roles) => loadRolesSuccess({ roles })),
            catchError((error) => of(loadRolesFailure({ error })))
          )
        )
      )
    )
  );
}
