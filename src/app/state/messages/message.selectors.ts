import { createSelector } from '@ngrx/store';
import { AppState } from '../App.state';
import { MessageState } from './message.reducers';

export const selectMessages = (state: AppState) => state.messages;
export const selectAllMessages = createSelector(
  selectMessages,
  (state: MessageState) => state.messages
);

// export const selectMessageToSend = createSelector(
//   selectMessages,
//   (state: MessageState) => state.messageToSend
// );
