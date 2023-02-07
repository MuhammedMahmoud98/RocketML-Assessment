import { createReducer, on } from '@ngrx/store';
import * as CounterActions from '../actions/counter.action';

interface State {
  counter?: number;
}

export const initialState: State = {
  counter: 0,
};

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.counterIncrement, (state, Action) => ({ ...state, counter: Action.value })),
);
