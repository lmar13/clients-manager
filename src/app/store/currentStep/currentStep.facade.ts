import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setCurrentStep } from './currentStep.actions';
import { selectCurrentStep } from './currentStep.selector';

@Injectable({ providedIn: 'root' })
export class CurrentStepFacade {
  private store = inject(Store);

  get current$() {
    return this.store.select(selectCurrentStep);
  }

  set current(value: number) {
    this.store.dispatch(setCurrentStep({ currentStep: value }));
  }
}
