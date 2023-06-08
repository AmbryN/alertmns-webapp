import { createReducer, on } from "@ngrx/store";
import { Channel } from "../../models/Channel";
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
  updateChannel,
  updateChannelFailure,
  updateChannelSuccess,
} from "./channel.action";

export interface ChannelState {
  channels: Channel[];
  selectedChannel: Channel;
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: ChannelState = {
  channels: [],
  selectedChannel: { name: "", visibility: "PUBLIC", members: [], groups: [] },
  error: "",
  status: "pending",
};

export const channelReducer = createReducer(
  // Supply initial state
  initialState,
  on(loadChannels, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadChannelsSuccess, (state, { channels }) => ({
    ...state,
    channels: channels,
    status: "success",
    error: "",
  })),
  on(loadChannelsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(loadChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: "success",
    error: "",
  })),
  on(createChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(createChannelSuccess, (state, { channel }) => ({
    ...state,
    channels: [...state.channels, channel],
    status: "success",
    error: "",
  })),
  on(createChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(addUsersToChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(addUsersToChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: "success",
    error: "",
  })),
  on(addUsersToChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(addGroupsToChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(addGroupToChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: "success",
    error: "",
  })),
  on(addGroupToChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(removeUserFromChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(removeUserFromChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: "success",
    error: "",
  })),
  on(removeUserFromChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(removeGroupFromChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(removeGroupFromChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    status: "success",
    error: "",
  })),
  on(removeGroupFromChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(updateChannel, (state) => ({
    ...state,
    status: "loading",
  })),
  on(updateChannelSuccess, (state, { channel }) => ({
    ...state,
    selectedChannel: channel,
    channels: [
      ...state.channels.filter((item) => item.id != channel.id),
      channel,
    ],
    status: "success",
    error: "",
  })),
  on(updateChannelFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  }))
);
