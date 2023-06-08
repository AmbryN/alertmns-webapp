import { createReducer, on } from "@ngrx/store";
import {
  addGroup,
  addGroupFailure,
  addGroupSuccess,
  addUserToGroup,
  addUserToGroupFailure,
  addUserToGroupSuccess,
  loadGroup,
  loadGroupFailure,
  loadGroups,
  loadGroupsFailure,
  loadGroupsSuccess,
  loadGroupSuccess,
  removeUserFromGroup,
  removeUserFromGroupFailure,
  removeUserFromGroupSuccess,
  updateGroup,
  updateGroupFailure,
  updateGroupSuccess,
} from "./group.action";
import { Group } from "../../models/Group";

export interface GroupState {
  groups: Group[];
  selectedGroup: Group;
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: GroupState = {
  groups: [],
  selectedGroup: { name: "" },
  error: "",
  status: "pending",
};

export const groupReducer = createReducer(
  // Supply initial state
  initialState,
  on(loadGroups, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadGroupsSuccess, (state, { groups }) => ({
    ...state,
    groups: groups,
    status: "success",
    error: "",
  })),
  on(loadGroupsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(loadGroup, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadGroupSuccess, (state, { group }) => ({
    ...state,
    selectedGroup: group,
    status: "success",
  })),
  on(loadGroupFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  })),
  on(addGroup, (state) => ({
    ...state,
    status: "loading",
  })),
  on(addGroupSuccess, (state, { group }) => ({
    ...state,
    groups: [...state.groups.filter((item) => item.id != group.id), group],
    status: "success",
  })),
  on(addGroupFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  })),
  on(updateGroup, (state) => ({
    ...state,
    status: "loading",
  })),
  on(updateGroupSuccess, (state, { group }) => ({
    ...state,
    groups: [...state.groups.filter((item) => item.id != group.id), group],
    status: "success",
    error: "",
  })),
  on(updateGroupFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  })),
  on(addUserToGroup, (state) => ({
    ...state,
    status: "loading",
  })),
  on(addUserToGroupSuccess, (state, { group }) => {
    return {
      ...state,
      selectedGroup: group,
      status: "success",
    };
  }),
  on(addUserToGroupFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  })),
  on(removeUserFromGroup, (state) => ({
    ...state,
    status: "loading",
  })),
  on(removeUserFromGroupSuccess, (state, { group }) => {
    return {
      ...state,
      selectedGroup: group,
      status: "success",
    };
  }),
  on(removeUserFromGroupFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  }))
);
