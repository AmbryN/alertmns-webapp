import { AppState } from '../App.state';
import { ChannelState } from './channel.reducers';
import { createSelector } from '@ngrx/store';

export const selectChannels = (state: AppState) => state.channels;

export const selectAllChannels = createSelector(
  selectChannels,
  (state: ChannelState) => state.channels
);

export const selectedChannel = createSelector(
  selectChannels,
  (state: ChannelState) => state.selectedChannel
);
