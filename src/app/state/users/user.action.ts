import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export const loadUsers = createAction('[Admin Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Admin Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Admin Users] Load Users Failure',
  props<{ error: string }>()
);

export const deleteUser = createAction(
  '[Admin Users] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[Admin Users] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[Admin Users] Delete User Failure',
  props<{ error: string }>()
);
