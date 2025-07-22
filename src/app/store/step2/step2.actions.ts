import { createAction, props } from '@ngrx/store';

export const updateStep2 = createAction('[Form] Update Step 2', props<{ interests: string[] }>());
