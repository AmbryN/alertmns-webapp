import { AppState } from '../App.state';
import { RoleState } from './role.reducers';
import { createSelector } from '@ngrx/store';

export const selectRoles = (state: AppState) => state.roles;

export const selectAllRoles = createSelector(
  selectRoles,
  (state: RoleState) => state.roles
);
