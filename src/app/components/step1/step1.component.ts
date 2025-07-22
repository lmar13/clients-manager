import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-step1',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss',
})
export class Step1Component {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
  });

  onSubmit() {
    console.log(this.form.value);
    if (this.form.valid) {
      // this.store.dispatch(saveStep1Data({ data: this.form.value }));
      console.log('Test');
      this.router.navigate(['../step-2'], { relativeTo: this.route });
    }
  }
}
