import { createAction, props } from "@ngrx/store";
import { User } from "../../models/User";
import { Form } from "@angular/forms";

export const loadUsers = createAction("[Admin Users] Load Users");

export const loadUsersSuccess = createAction(
  "[Admin Users] Load Users Success",
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  "[Admin Users] Load Users Failure",
  props<{ error: string }>()
);

export const loadUser = createAction(
  "[Update User] Load User",
  props<{ userId: number }>()
);

export const loadUserSuccess = createAction(
  "[Update User] Load User Success",
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  "[Update User] Load User Failure",
  props<{ error: string }>()
);

export const addUser = createAction(
  "[Admin Users] Add User",
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  "[Admin Users] Add User Success",
  props<{ user: User }>()
);

export const addUserFailure = createAction(
  "[Admin Users] Add User Failure",
  props<{ error: string }>()
);

export const updateUser = createAction(
  "[Admin Users] Udpdate User",
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  "[Admin Users] Update User Success",
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  "[Admin Users] Update User Failure",
  props<{ error: string }>()
);

export const deleteUser = createAction(
  "[Admin Users] Delete User",
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  "[Admin Users] Delete User Success",
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  "[Admin Users] Delete User Failure",
  props<{ error: string }>()
);

export const batchUploadUsers = createAction(
  "[Admin Users] Batch Upload Users",
  props<{ file: FormData }>()
);

export const batchUploadUsersSuccess = createAction(
  "[Admin Users] Batch Upload Users Success",
  props<{ users: User[] }>()
);

export const batchUploadUsersFailure = createAction(
  "[Admin Users] Batch Upload Users Failure",
  props<{ error: string }>()
);
