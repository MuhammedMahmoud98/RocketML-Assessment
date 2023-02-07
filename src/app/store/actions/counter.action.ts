import { createAction, props } from '@ngrx/store';

export const counterIncrement = createAction(
  '[Counter] increment counter',
  props<{value: number}>(),
);

export const counterDecrement = createAction(
  '[Counter] Decrement counter',
  props<{value: number}>(),
);
