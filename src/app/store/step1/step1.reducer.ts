import { createReducer, on } from '@ngrx/store';
import { updateStep1 } from './step1.actions';
import { initialStep1State } from './step1.state';

export const step1Reducer = createReducer(
  initialStep1State,
  on(updateStep1, (state, { name, surname, phone }) => ({ name, surname, phone }))
);
