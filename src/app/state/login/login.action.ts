import { createAction, props } from '@ngrx/store';
import { User } from '../../models/User';

export const login = createAction(
  '[Login Page] Login attempt',
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  '[Login Page] Login success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login Page] Login failure',
  props<{ error: string }>()
);
