import { MessageState } from './messages/message.reducers';
import { ChannelState } from './channels/channel.reducers';

export interface AppState {
  messages: MessageState;
  channels: ChannelState;
}
