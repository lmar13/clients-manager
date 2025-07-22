import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { Client } from '../models/client.model';
import { updateStep1 } from './step1/step1.actions';
import { selectStep1 } from './step1/step1.selector';
import { updateStep2 } from './step2/step2.actions';
import { selectStep2 } from './step2/step2.selector';

@Injectable({ providedIn: 'root' })
export class FormFacade {
  private store = inject(Store);

  get data$() {
    return combineLatest([this.store.select(selectStep1), this.store.select(selectStep2)]).pipe(
      map(([step1, step2]) => ({ ...step1, ...step2 }))
    );
  }

  set data(data: Client) {
    this.store.dispatch(updateStep1({ name: data.name, surname: data.surname, phone: data.phone }));
    this.store.dispatch(updateStep2({ interests: data.interests }));
  }
}
