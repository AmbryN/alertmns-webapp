import { User } from './User';

export type IncomingMessage = {
  channelId: number;
  sender: User;
  content: string;
};
