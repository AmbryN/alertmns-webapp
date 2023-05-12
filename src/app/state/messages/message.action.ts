import { createAction, props } from '@ngrx/store';
import { Message } from '../../models/Message';

export const loadMessages = createAction(
  '[Channel Page] Load Messages',
  props<{ channelId: number }>()
);

export const sendMessage = createAction(
  '[Channel Page] Add message',
  props<{ channelId: number; message: Message }>()
);

export const receiveMessage = createAction(
  '[Channel Page] Receive Message',
  props<{ message: Message }>()
);

export const loadMessagesSuccess = createAction(
  '[Channel Page] Messages Load Success',
  props<{ messages: Message[] }>()
);

export const loadMessagesFailure = createAction(
  '[Channel Page] Messages Load Failure',
  props<{ error: string }>()
);

export const sendMessageSuccess = createAction(
  'Channel Page] Message Send Success'
);

export const sendMessageFailure = createAction(
  'Channel Page] Message Send Failure',
  props<{ error: string }>()
);
