import { createReducer, on } from '@ngrx/store';
import {
  updateUser,
  addUserFailure,
  addUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  updateUserSuccess,
  updateUserFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
} from './user.action';
import { User } from '../../models/User';

export interface UserState {
  users: User[];
  selectedUser: User | null;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: UserState = {
  users: [],
  selectedUser: null,
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
  on(loadUser, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    status: 'success',
  })),
  on(loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(updateUser, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    status: 'success',
  })),
  on(addUserFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error',
  })),
  on(updateUser, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users.filter((item) => item.id != user.id), user],
    status: 'success',
  })),
  on(updateUserFailure, (state, { error }) => ({
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
