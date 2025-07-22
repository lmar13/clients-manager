import { createFeatureSelector } from '@ngrx/store';
import { CurrentStepState } from './currentStep.state';

export const selectCurrentStep = createFeatureSelector<CurrentStepState>('currentStep');
