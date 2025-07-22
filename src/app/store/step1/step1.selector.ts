import { createFeatureSelector } from '@ngrx/store';
import { Step1State } from './step1.state';

export const selectStep1 = createFeatureSelector<Step1State>('step1');
