import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { FormFacade } from '../../store/form.facade';

@Component({
  selector: 'app-step3',
  imports: [MatCardModule, AsyncPipe, NgIf, MatButtonModule],
  templateUrl: './step3.component.html',
  styleUrl: './step3.component.scss',
})
export class Step3Component {
  private router = inject(Router);
  private facade$ = inject(FormFacade);
  readonly data$ = this.facade$.data$;

  prev() {
    console.log('Test next');
    this.router.navigate(['add/step-2']);
  }

  save(data: Partial<Client>) {
    console.log(data);
  }
}
