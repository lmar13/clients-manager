import { createAction, props } from '@ngrx/store';

export const updateStep1 = createAction(
  '[Form] Update Step 1',
  props<{ name: string; surname: string; phone: string }>()
);
