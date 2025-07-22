import { createAction, props } from '@ngrx/store';

export const setCurrentStep = createAction('[Form] set current step', props<{ currentStep: number }>());
