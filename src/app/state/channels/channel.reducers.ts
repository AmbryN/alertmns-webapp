import { createReducer, on } from '@ngrx/store';
import { Channel } from '../../models/Channel';
import {
  addGroupsToChannel,
  addGroupToChannelFailure,
  addGroupToChannelSuccess,
  addUsersToChannel as addUsersToChannel,
  addUsersToChannelFailure as addUsersToChannelFailure,
  addUsersToChannelSuccess as addUsersToChannelSuccess,
  createChannel,
  createChannelFailure,
  createChannelSuccess,
  loadChannel,
  loadChannels,
  loadChannelsFailure,
  loadChannelsSuccess,
  loadChannelSuccess,
  removeGroupFromChannel,
  removeGroupFromChannelFailure,
  removeGroupFromChannelSuccess,
  removeUserFromChannel,
  removeUserFromChannelFailure,
  removeUserFromChannelSuccess,
} from './channel.action';

export interface ChannelState {
  channels: Channel[];
  selectedChannel: Channel;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ChannelState = {
  channels: [],
  selectedChannel: { name: '', visibility: 'PUBLIC', members: [], groups: [] },
  error: '',
  status: 'pending',
};

export const channelReducer = createReducer(
  // Supply initial state
  initialState,
  on(loadChannels, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadChannelsSuccess, (state, { channels }) => ({
    ...state,
    channels: channels,
    status: 'success',
    error: '',
  })),
  on(loadChannelsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(loadChannel, (state, { channelId }) => ({
    ...state,
    status: 'loading',
  })),
  on(loadChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: 'success',
    error: '',
  })),
  on(createChannel, (state, { channel }) => ({
    ...state,
    status: 'loading',
  })),
  on(createChannelSuccess, (state, { channel }) => ({
    ...state,
    channels: [...state.channels, channel],
    status: 'success',
    error: '',
  })),
  on(createChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(addUsersToChannel, (state, { channelId, users }) => ({
    ...state,
    status: 'loading',
  })),
  on(addUsersToChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: 'success',
    error: '',
  })),
  on(addUsersToChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(addGroupsToChannel, (state, { channelId, groups }) => ({
    ...state,
    status: 'loading',
  })),
  on(addGroupToChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: 'success',
    error: '',
  })),
  on(addGroupToChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(removeUserFromChannel, (state, { channelId, userId }) => ({
    ...state,
    status: 'loading',
  })),
  on(removeUserFromChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: 'success',
    error: '',
  })),
  on(removeUserFromChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(removeGroupFromChannel, (state, { channelId, groupId }) => ({
    ...state,
    status: 'loading',
  })),
  on(removeGroupFromChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: 'success',
    error: '',
  })),
  on(removeGroupFromChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  }))
);
