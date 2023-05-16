import { MessageState } from './messages/message.reducers';
import { ChannelState } from './channels/channel.reducers';
import { LoginState } from './login/login.reducers';
import { UserState } from './users/user.reducers';

export interface AppState {
  messages: MessageState;
  channels: ChannelState;
  login: LoginState;
  users: UserState;
}
