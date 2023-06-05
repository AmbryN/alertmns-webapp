import { createSelector } from '@ngrx/store';
import { AppState } from '../App.state';
import { NotificationState } from './notification.reducers';

export const selectNotifications = (state: AppState) => state.notifications;
export const selectAllNotifications = createSelector(
  selectNotifications,
  (state: NotificationState) => state.notifications
);

