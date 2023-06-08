import { createReducer, on } from "@ngrx/store";
import {
  loadNotifications,
  loadNotificationsFailure,
  loadNotificationsSuccess,
  markNotificationsAsSeen,
  markNotificationsAsSeenFailure,
  markNotificationsAsSeenSuccess,
} from "./notification.action";
import { Notification } from "src/app/models/Notification";

export interface NotificationState {
  notifications: Notification[];
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: NotificationState = {
  notifications: [],
  error: "",
  status: "pending",
};

export const notificationReducer = createReducer(
  // Supply initial state
  initialState,
  // Add a new message to the messages array
  on(loadNotifications, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadNotificationsSuccess, (state, { notifications }) => ({
    ...state,
    notifications: notifications,
    status: "success",
    error: "",
  })),
  on(loadNotificationsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(markNotificationsAsSeen, (state) => ({
    ...state,
    status: "loading",
  })),
  on(markNotificationsAsSeenSuccess, (state, { notifications }) => ({
    ...state,
    notifications: notifications,
    status: "success",
    error: "",
  })),
  on(markNotificationsAsSeenFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  }))
);
