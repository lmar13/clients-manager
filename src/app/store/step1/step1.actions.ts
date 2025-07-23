import { createAction, props } from '@ngrx/store';

export const updateStep1 = createAction(
  '[Step 1] Update Step 1',
  props<{ name: string; surname: string; phone: string }>()
);

export const clearStep1State = createAction('[Step 1] Clear State');
