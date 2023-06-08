import { AppState } from "../App.state";
import { UserState } from "./user.reducers";
import { createSelector } from "@ngrx/store";

export const selectUsers = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);

export const userStatus = createSelector(
  selectUsers,
  (state: UserState) => state.status
);

export const userError = createSelector(
  selectUsers,
  (state: UserState) => state.error
);

export const selectSelectedUser = createSelector(
  selectUsers,
  (state: UserState) => state.selectedUser
);
