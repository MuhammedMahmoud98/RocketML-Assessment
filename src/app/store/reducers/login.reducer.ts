import { createReducer, on } from '@ngrx/store';

import * as LoginActions from '../actions/login.action';
import { User } from '../../models/user.model';

export interface LoginState {
  isLoading?: boolean;
  user?: User;
  token?: string;
  hasError?: boolean;
  errorMessage?: string;
}

const initialState: LoginState = {
  hasError: false,
  isLoading: false,
  user: {},
  token: '',
  errorMessage: '',
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.startLogin, (state) => ({ ...state, isLoading: true })),
  on(LoginActions.loginSuccess, (state, Action) => ({
    ...state, isLoading: false, user: Action.user, token: Action.token,
  })),
  on(LoginActions.loginFailed, (state, Action) => ({
    ...state, isLoading: false, hasError: true, errorMessage: Action.message,
  })),
  on(LoginActions.logOut, (state) => ({
    ...state,
  })),
);
