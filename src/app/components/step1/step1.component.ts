import { Component, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { phoneNumberValidator } from '../../shared/validators/phone-number.validator';
import { Step1Facade } from '../../store/step1/step1.facade';
import { CurrentStepFacade } from './../../store/currentStep/currentStep.facade';

@Component({
  selector: 'app-step1',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private step1Facade = inject(Step1Facade);
  private currentStepFacade$ = inject(CurrentStepFacade);
  form!: FormGroup;

  nameErrorMessage = signal('');
  surnameErrorMessage = signal('');
  phoneErrorMessage = signal('');

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, phoneNumberValidator()]],
    });

    this.step1Facade.step$.subscribe(data => {
      this.form.patchValue(data);
    });

    merge(this.form.get('name')!.statusChanges, this.form.get('name')!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateNameMessage());

    merge(this.form.get('surname')!.statusChanges, this.form.get('surname')!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateSurnameMessage());

    merge(this.form.get('phone')!.statusChanges, this.form.get('phone')!.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePhoneMessage());
  }

  next() {
    this.currentStepFacade$.current = 0;
    if (this.form.valid) {
      this.step1Facade.update({
        name: this.form.value.name!,
        surname: this.form.value.surname!,
        phone: this.form.value.phone!,
      });
      this.router.navigate(['add/step-2']);
    }
  }

  updateNameMessage() {
    const control = this.form.get('name');
    if (control?.hasError('required')) {
      this.nameErrorMessage.set('Name is required');
    } else {
      this.nameErrorMessage.set('');
    }
  }

  updateSurnameMessage() {
    const control = this.form.get('surname');
    if (control?.hasError('required')) {
      this.surnameErrorMessage.set('Surname is required');
    } else {
      this.surnameErrorMessage.set('');
    }
  }

  updatePhoneMessage() {
    const control = this.form.get('phone');
    if (control?.hasError('required')) {
      this.phoneErrorMessage.set('Phone is required');
    }
    if (control?.hasError('invalidPhone')) {
      this.phoneErrorMessage.set('Invalid phone number');
    }
    return '';
  }
}
