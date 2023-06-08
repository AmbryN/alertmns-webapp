import { OutgoingMessage } from "../../models/OutgoingMessage";
import { createReducer, on } from "@ngrx/store";
import {
  sendMessage,
  loadMessages,
  loadMessagesFailure,
  loadMessagesSuccess,
  receiveMessage,
  sendMessageSuccess,
  sendMessageFailure,
} from "./message.action";
import { IncomingMessage } from "../../models/IncomingMessage";

export interface MessageState {
  channelId?: number;
  messages: IncomingMessage[];
  messageToSend: OutgoingMessage;
  error: string;
  status: "pending" | "loading" | "error" | "success";
}

export const initialState: MessageState = {
  channelId: undefined,
  messages: [],
  messageToSend: {} as OutgoingMessage,
  error: "",
  status: "pending",
};

export const messageReducer = createReducer(
  // Supply initial state
  initialState,
  // Add a new message to the messages array
  on(sendMessage, (state, { message }) => ({
    ...state,
    messageToSend: message,
  })),
  on(receiveMessage, (state, { message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  // Load existing messages
  on(loadMessages, (state) => ({
    ...state,
    status: "loading",
  })),
  on(loadMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages: messages,
    status: "success",
    error: "",
  })),
  on(loadMessagesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: "error",
  })),
  on(sendMessageSuccess, (state) => ({
    ...state,
    status: "success",
    error: "",
  })),
  on(sendMessageFailure, (state, { error }) => ({
    ...state,
    status: "error",
    error: error,
  }))
);
