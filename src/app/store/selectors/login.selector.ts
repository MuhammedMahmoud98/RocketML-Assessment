import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../reducers/login.reducer';

const userFeature = createFeatureSelector<LoginState>('user');

export const selectUser = createSelector(
  (state) => state['loginReducer'],
  (state: LoginState) => state,
);

export const isLoggingIn = createSelector(
  (state) => state['loginReducer'],
  (state) => state.isLoading,
);
