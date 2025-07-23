import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientsFacade } from '../../store/clients/clients.facade';
import { FormFacade } from '../../store/form.facade';
import { Step1Facade } from '../../store/step1/step1.facade';

@Component({
  selector: 'app-step3',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  private router = inject(Router);
  private formFacade = inject(FormFacade);
  private step1Facade = inject(Step1Facade);
  private clientsFacade = inject(ClientsFacade);
  readonly data = toSignal(this.formFacade.data$);
  readonly isValidToSave = toSignal(this.step1Facade.valid$);

  prev() {
    this.router.navigate(['add/step-2']);
  }

  save(data: Partial<Client>) {
    this.clientsFacade.addClient(data);
  }
}
