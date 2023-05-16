import { AppState } from '../App.state';
import { createSelector } from '@ngrx/store';
import { LoginState } from './login.reducers';

export const selectLogin = (state: AppState) => state.login;

export const selectCurrentUser = createSelector(
  selectLogin,
  (state: LoginState) => state.user
);

export const selectLoginError = createSelector(
  selectLogin,
  (state) => state.error
);
