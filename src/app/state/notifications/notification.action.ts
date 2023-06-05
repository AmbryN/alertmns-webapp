import { createAction, props } from '@ngrx/store';
import { Notification } from 'src/app/models/Notification';


export const loadNotifications = createAction(
  '[Main Page] Load Notifications'
);

export const loadNotificationsSuccess = createAction(
  '[Main Page] Notifications Load Success',
  props<{ notifications: Notification[] }>()
);

export const loadNotificationsFailure = createAction(
  '[Main Page] Notifications Load Failure',
  props<{ error: string }>()
);

export const markNotificationsAsSeen = createAction(
  '[Main Page] Mark Notifications As Seen',
  props<{ channelId: number }>()
);

export const markNotificationsAsSeenSuccess = createAction(
  '[Main Page] Mark Notifications As Seen Success',
  props<{ notifications: Notification[] }>()
);

export const markNotificationsAsSeenFailure = createAction(
  '[Main Page] Mark Notifications As Seen Failure',
  props<{ error: string }>()
);
