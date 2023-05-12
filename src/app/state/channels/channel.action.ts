import { createAction, props } from '@ngrx/store';
import { Channel } from '../../models/Channel';

export const loadChannels = createAction('[Sidebar] Load Channels');

export const loadChannelsSuccess = createAction(
  '[Sidebar] Channels Load Success',
  props<{ channels: Channel[] }>()
);

export const loadChannelsFailure = createAction(
  '[Sidebar] Channels Load Failure',
  props<{ error: string }>()
);

export const loadChannel = createAction(
  '[Channel View] Load Channel',
  props<{ channelId: number }>()
);

export const loadChannelSuccess = createAction(
  '[Channel View] Load Channel Success',
  props<{ channel: Channel }>()
);

export const loadChannelFailure = createAction(
  '[Channel View] Load Channel Success',
  props<{ error: string }>()
);
