import { createReducer, on } from '@ngrx/store';
import { updateStep2 } from './step2.actions';
import { initialStep2State } from './step2.state';

export const step2Reducer = createReducer(
  initialStep2State,
  on(updateStep2, (state, { interests }) => ({
    ...state,
    interests: [...state.interests, ...interests],
  }))
);
