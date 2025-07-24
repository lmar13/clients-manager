import { Injectable, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { Client } from '../models/client.model';
import { Step1Facade } from './step1/step1.facade';
import { Step2Facade } from './step2/step2.facade';

@Injectable({ providedIn: 'root' })
export class FormFacade {
  private step1Facade = inject(Step1Facade);
  private step2Facade = inject(Step2Facade);

  get data$() {
    return combineLatest([this.step1Facade.step$, this.step2Facade.step$]).pipe(
      map(([step1, step2]) => ({ ...step1, ...step2 }))
    );
  }

  set data(data: Client) {
    this.step1Facade.update({ name: data.name, surname: data.surname, phone: data.phone });
    this.step2Facade.update({ interests: data.interests });
  }

  clear() {
    this.step1Facade.clear();
    this.step2Facade.clear();
  }

  get valid$() {
    return this.step1Facade.valid$;
  }
}
