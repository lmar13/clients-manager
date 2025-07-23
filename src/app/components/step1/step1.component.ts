import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
    });

    this.step1Facade.step$.subscribe(data => {
      this.form.patchValue(data);
    });
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
}
