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
