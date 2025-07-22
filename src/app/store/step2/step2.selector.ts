import { createFeatureSelector } from '@ngrx/store';
import { Step2State } from './step2.state';

export const selectStep2 = createFeatureSelector<Step2State>('step2');
