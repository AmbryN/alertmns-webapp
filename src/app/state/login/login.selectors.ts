import { AppState } from '../App.state';
import { createSelector } from '@ngrx/store';
import { LoginState } from './login.reducers';

export const selectLogin = (state: AppState) => state.login;

export const selectCurrentUser = createSelector(
  selectLogin,
  (state: LoginState) => state.user
);

export const loginError = createSelector(selectLogin, (state) => state.error);

export const selectLoginStatus = createSelector(
  selectLogin,
  (state) => state.status
);
