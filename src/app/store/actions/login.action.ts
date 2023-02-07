import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const startLogin = createAction(
  '[Login] Start login',
  props<{userName?: string; password?: string}>(),
);

export const loginSuccess = createAction(
  '[Login] Login success',
  props<{user?: User, token?: string}>(),
);

export const loginFailed = createAction(
  '[Login] Login failed',
  props<{message?: string}>(),
);

export const logOut = createAction(
  '[Login] Logout',
);
