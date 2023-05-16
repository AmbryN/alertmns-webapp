import { createReducer, on } from '@ngrx/store';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
} from './user.action';
import { User } from '../../models/User';

export interface UserState {
  users: User[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UserState = {
  users: [],
  error: '',
  status: 'pending',
};

export const userReducer = createReducer(
  // Supply initial state
  initialState,
  on(loadUsers, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    status: 'success',
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(deleteUser, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter((user) => user.id != userId),
    status: 'success',
  })),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  }))
);
