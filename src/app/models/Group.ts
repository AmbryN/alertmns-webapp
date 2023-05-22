import { User } from './User';

export type Group = {
  id?: number;
  name: string;
  members?: User[];
};
