import { createAction, props } from "@ngrx/store";
import { Group } from "../../models/Group";
import { User } from "../../models/User";

export const loadGroups = createAction("[Admin Groups] Load Groups");

export const loadGroupsSuccess = createAction(
  "[Admin Groups] Load Groups Success",
  props<{ groups: Group[] }>()
);

export const loadGroupsFailure = createAction(
  "[Admin Groups] Load Groups Failure",
  props<{ error: string }>()
);

export const loadGroup = createAction(
  "[Admin Groups] Load Group",
  props<{ groupId: number }>()
);

export const loadGroupSuccess = createAction(
  "[Admin Groups] Load Group Success",
  props<{ group: Group }>()
);

export const loadGroupFailure = createAction(
  "[Admin Groups] Load Group Failure",
  props<{ error: string }>()
);

export const addGroup = createAction(
  "[Admin Groups] Add Group",
  props<{ group: Group }>()
);

export const addGroupSuccess = createAction(
  "[Admin Groups] Add Group Success",
  props<{ group: Group }>()
);

export const addGroupFailure = createAction(
  "[Admin Groups] Add Group Failure",
  props<{ error: string }>()
);

export const updateGroup = createAction(
  "[Admin Groups] Update Group",
  props<{ group: Group }>()
);

export const updateGroupSuccess = createAction(
  "[Admin Groups] Update Group Success",
  props<{ group: Group }>()
);

export const updateGroupFailure = createAction(
  "[Admin Groups] Update Group Failure",
  props<{ error: string }>()
);

export const addUserToGroup = createAction(
  "[Admin Groups] Add User to Group",
  props<{ groupId: number; users: User[] }>()
);

export const addUserToGroupSuccess = createAction(
  "[Admin Groups] Add User to Group Success",
  props<{ group: Group }>()
);

export const addUserToGroupFailure = createAction(
  "[Admin Groups] Add User to Group Failure",
  props<{ error: string }>()
);

export const removeUserFromGroup = createAction(
  "[Admin Groups] Remove user from group",
  props<{ groupId: number; userId: number }>()
);

export const removeUserFromGroupSuccess = createAction(
  "[Admin Groups] Remove user from group Success",
  props<{ group: Group }>()
);

export const removeUserFromGroupFailure = createAction(
  "[Admin Groups] Remove user from group Failure",
  props<{ error: string }>()
);
