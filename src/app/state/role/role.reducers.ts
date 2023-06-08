import { createReducer, on } from "@ngrx/store";
import { loadRoles, loadRolesFailure, loadRolesSuccess } from "./role.actions";
import { Role } from "../../models/Role";

export interface RoleState {
  roles: Role[];
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: RoleState = {
  roles: [],
  error: "",
  status: "pending",
};

export const roleReducer = createReducer(
  // Supply initial state
  initialState,
  on(loadRoles, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadRolesSuccess, (state, { roles }) => ({
    ...state,
    roles,
    status: "success",
    error: "",
  })),
  on(loadRolesFailure, (state, { error }) => ({
    ...state,
    error,
    status: "error",
  }))
);
