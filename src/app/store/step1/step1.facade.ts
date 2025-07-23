import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { clearStep1State, updateStep1 } from './step1.actions';
import { selectStep1 } from './step1.selector';
import { Step1State } from './step1.state';

@Injectable({ providedIn: 'root' })
export class Step1Facade {
  private store = inject(Store);

  get step$() {
    return this.store.select(selectStep1);
  }

  get valid$() {
    return this.step$.pipe(map(data => Object.values(data).every(x => !!x)));
  }

  update(data: Step1State) {
    this.store.dispatch(updateStep1(data));
  }

  clear() {
    this.store.dispatch(clearStep1State());
  }
}
