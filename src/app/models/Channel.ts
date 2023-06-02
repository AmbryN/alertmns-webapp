import { User } from './User';
import { Group } from './Group';

export type Channel = {
  id?: number;
  name: string;
  visibility: string;
  members: User[];
  groups: Group[];
};
