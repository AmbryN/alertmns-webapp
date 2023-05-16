import { createReducer, on } from '@ngrx/store';
import {
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './login.action';
import { User } from '../../models/User';

export interface LoginState {
  user: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: LoginState = {
  user: null,
  error: '',
  status: 'pending',
};

export const loginReducer = createReducer(
  // Supply initial state
  initialState,
  // Add a new message to the messages array
  on(login, (state, { user }) => ({
    ...state,
    status: 'loading',
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success',
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(loadProfile, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadProfileSuccess, (state, { user }) => ({
    ...state,
    user,
    status: 'success',
  })),
  on(loadProfileFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    status: 'pending',
  }))
);
