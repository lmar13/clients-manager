import { createAction, props } from '@ngrx/store';

export const updateStep2 = createAction('[Step 2] Update Step 2', props<{ interests: string[] }>());
export const clearStep2State = createAction('[Step 2] Clear State');
