import { Message } from './Message';
import { User } from './User';

export type Channel = {
  id?: number;
  name: string;
  visibility: string;
  members: User[];
  messages: Message[];
};
