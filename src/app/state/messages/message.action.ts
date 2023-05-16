import { createAction, props } from '@ngrx/store';
import { OutgoingMessage } from '../../models/OutgoingMessage';
import { IncomingMessage } from '../../models/IncomingMessage';

export const loadMessages = createAction(
  '[Channel Page] Load Messages',
  props<{ channelId: number }>()
);

export const sendMessage = createAction(
  '[Channel Page] Add message',
  props<{ message: OutgoingMessage }>()
);

export const receiveMessage = createAction(
  '[Channel Page] Receive OutgoingMessage',
  props<{ message: IncomingMessage }>()
);

export const loadMessagesSuccess = createAction(
  '[Channel Page] Messages Load Success',
  props<{ messages: IncomingMessage[] }>()
);

export const loadMessagesFailure = createAction(
  '[Channel Page] Messages Load Failure',
  props<{ error: string }>()
);

export const sendMessageSuccess = createAction(
  'Channel Page] OutgoingMessage Send Success'
);

export const sendMessageFailure = createAction(
  'Channel Page] OutgoingMessage Send Failure',
  props<{ error: string }>()
);
