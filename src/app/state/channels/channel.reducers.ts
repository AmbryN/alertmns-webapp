import { createReducer, on } from '@ngrx/store';
import { Channel } from '../../models/Channel';
import {
  loadChannel,
  loadChannels,
  loadChannelsFailure,
  loadChannelsSuccess,
  loadChannelSuccess,
} from './channel.action';

export interface ChannelState {
  channels: Channel[];
  selectedChannel: Channel | null;
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ChannelState = {
  channels: [],
  selectedChannel: null,
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
  }))
);
