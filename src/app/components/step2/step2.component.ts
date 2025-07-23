import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Step2Facade } from '../../store/step2/step2.facade';

@Component({
  selector: 'app-step2',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private step2Facade = inject(Step2Facade);

  form!: FormGroup;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;

  ngOnInit(): void {
    this.form = this.fb.group({
      interests: this.fb.array([]),
    });

    this.step2Facade.step$.subscribe(value => {
      const interests = value.interests || [];
      const array = this.form.get('interests') as FormArray;
      interests.forEach(i => array.push(new FormControl(i)));
    });
  }

  next() {
    this.step2Facade.update({ interests: this.interests.value });
    this.router.navigate(['add/step-3']);
  }

  prev() {
    this.step2Facade.update({ interests: this.interests.value });
    this.router.navigate(['add/step-1']);
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  get interests(): FormArray {
    return this.form.get('interests') as FormArray;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.interests.push(new FormControl(value));
    }
    event.chipInput?.clear();
  }

  remove(interest: string): void {
    const index = this.interests.controls.findIndex(ctrl => ctrl.value === interest);
    if (index >= 0) {
      this.interests.removeAt(index);
    }
  }
}
