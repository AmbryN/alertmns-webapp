import { Role } from './Role';
import { Channel } from './Channel';

export type User = {
  id?: number;
  email: string;
  password?: string;
  lastname: string;
  firstname: string;
  roles?: string[];
  channels?: Channel[];
};
