import { createAction, props } from '@ngrx/store';
import { Role } from '../../models/Role';

export const loadRoles = createAction('[User Update] Load Roles');

export const loadRolesSuccess = createAction(
  '[User Update] Load Roles Success',
  props<{ roles: Role[] }>()
);

export const loadRolesFailure = createAction(
  '[User Update] Load Roles Failure',
  props<{ error: string }>()
);
