import { AppState } from '../App.state';
import { UserState } from './user.reducers';
import { createSelector } from '@ngrx/store';
import { createEffect } from '@ngrx/effects';

export const selectUsers = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);

export const userLoadingStatus = createSelector(
  selectUsers,
  (state: UserState) => state.status
);
