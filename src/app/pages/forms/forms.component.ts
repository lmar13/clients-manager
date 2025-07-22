import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgFor } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forms',
  imports: [
    MatFormFieldModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    NgFor,
    MatCardModule,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private _formBuilder = inject(FormBuilder);
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly interests: WritableSignal<string[]> = signal([]);

  firstFormGroup = this._formBuilder.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
  });

  ngOnInit() {
    this.route.data.subscribe(data => {
      const client = data['client'];

      console.log('Forms -> client: ', client);
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  add(event: MatChipInputEvent): void {
    const name = (event.value || '').trim();

    if (name) {
      this.interests.update(prev => [...prev, name]);
    }

    event.chipInput!.clear();
  }

  remove(interest: string): void {
    this.interests.update(prev => {
      const index = prev.indexOf(interest);
      if (index < 0) {
        return prev;
      }

      prev.splice(index, 1);
      return [...prev];
    });
  }
}
