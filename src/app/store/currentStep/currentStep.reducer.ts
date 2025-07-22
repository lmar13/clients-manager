import { createReducer, on } from '@ngrx/store';
import { setCurrentStep } from './currentStep.actions';
import { initialCurrentStepState } from './currentStep.state';

export const currentStepReducer = createReducer(
  initialCurrentStepState,
  on(setCurrentStep, (state, { currentStep }) => ({
    ...state,
    currentStep: currentStep,
  }))
);
