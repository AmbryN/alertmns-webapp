import { createReducer, on } from '@ngrx/store';
import { Channel } from '../../models/Channel';
import {
  loadChannels,
  loadChannelsFailure,
  loadChannelsSuccess,
} from './channel.action';

export interface ChannelState {
  channels: Channel[];
  error: string;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: ChannelState = {
  channels: [],
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
  }))
);
