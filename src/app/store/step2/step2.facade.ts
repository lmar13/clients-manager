import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { clearStep2State, updateStep2 } from './step2.actions';
import { selectStep2 } from './step2.selector';
import { Step2State } from './step2.state';

@Injectable({ providedIn: 'root' })
export class Step2Facade {
  private store = inject(Store);

  get step$() {
    return this.store.select(selectStep2);
  }

  update(data: Step2State) {
    this.store.dispatch(updateStep2(data));
  }

  clear() {
    this.store.dispatch(clearStep2State());
  }
}
