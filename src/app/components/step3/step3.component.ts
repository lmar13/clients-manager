import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { FormFacade } from '../../store/form.facade';
import { Step1Facade } from '../../store/step1/step1.facade';

@Component({
  selector: 'app-step3',
  imports: [MatCardModule, AsyncPipe, NgIf, MatButtonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  private router = inject(Router);
  private facade$ = inject(FormFacade);
  private step1Facade$ = inject(Step1Facade);
  private apiService = inject(ApiService);
  readonly data$ = this.facade$.data$;
  readonly isValidToSave = this.step1Facade$.valid$;

  prev() {
    console.log('Test next');
    this.router.navigate(['add/step-2']);
  }

  save(data: Partial<Client>) {
    this.apiService.addClient(data).subscribe(() => {
      this.router.navigate(['list']);
    });
  }
}
