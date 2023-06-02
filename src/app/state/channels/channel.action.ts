import { createAction, props } from '@ngrx/store';
import { Channel } from '../../models/Channel';
import { User } from 'src/app/models/User';
import { Group } from 'src/app/models/Group';

export const loadChannels = createAction('[Admin Channels] Load Channels');

export const loadChannelsSuccess = createAction(
  '[Admin Channels] Channels Load Success',
  props<{ channels: Channel[] }>()
);

export const loadChannelsFailure = createAction(
  '[Admin Channels] Channels Load Failure',
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

export const createChannel = createAction(
  '[Admin Channel] Create Channel',
  props<{ channel: Channel }>()
);

export const createChannelSuccess = createAction(
  '[Admin Channel] Create Channel Success',
  props<{ channel: Channel }>()
);

export const createChannelFailure = createAction(
  '[Admin Channel] Create Channel Failure',
  props<{ error: string }>()
);

export const addUsersToChannel = createAction(
  '[Admin Channel] Add User To Channel',
  props<{ channelId: number, users: User[]}>()
)

export const addUsersToChannelSuccess = createAction(
  '[Admin Channel] Add User To Channel Success',
  props<{ channel: Channel}>()
)

export const addUsersToChannelFailure = createAction(
  '[Admin Channel] Add User To Channel Failure',
  props<{ error: string }>()
)

export const addGroupsToChannel = createAction(
  '[Admin Channel] Add Group To Channel',
  props<{ channelId: number, groups: Group[]}>()
)

export const addGroupToChannelSuccess = createAction(
  '[Admin Channel] Add Group To Channel Success',
  props<{ channel: Channel}>()
)

export const addGroupToChannelFailure = createAction(
  '[Admin Channel] Add Group To Channel Failure',
  props<{ error: string }>()
)

export const removeUserFromChannel = createAction(
  '[Admin Channel] Remove User From Channel',
  props<{ channelId: number, userId: number}>()
)

export const removeUserFromChannelSuccess = createAction(
  '[Admin Channel] Remove User From Channel Success',
  props<{ channel: Channel}>()
)

export const removeUserFromChannelFailure = createAction(
  '[Admin Channel] Remove User From Channel Failure',
  props<{ error: string }>()
)

export const removeGroupFromChannel = createAction(
  '[Admin Channel] Remove Group From Channel',
  props<{ channelId: number, groupId: number}>()
)

export const removeGroupFromChannelSuccess = createAction(
  '[Admin Channel] Remove Group From Channel Success',
  props<{ channel: Channel}>()
)

export const removeGroupFromChannelFailure = createAction(
  '[Admin Channel] Remove Group From Channel Failure',
  props<{ error: string }>()
)
