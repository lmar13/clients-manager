import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FormFacade } from '../../store/form.facade';

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
    MatCardModule,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper | undefined;

  selectedStepIndex = 0;
  steps = [
    { label: 'Personal Info', path: 'step-1' },
    { label: 'Interests', path: 'step-2' },
    { label: 'Summary', path: 'step-3' },
  ];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private formFacade = inject(FormFacade);

  isFormValid$ = this.formFacade.valid$;

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const segment = this.route.firstChild?.snapshot.url[0]?.path;
      this.selectedStepIndex = this.mapSegmentToIndex(segment);
    });
  }

  private mapSegmentToIndex(segment: string | undefined): number {
    switch (segment) {
      case 'step-1':
        return 0;
      case 'step-2':
        return 1;
      case 'step-3':
        return 2;
      default:
        return 0;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionChanged(event: any) {
    this.selectedStepIndex = event.selectedIndex;
    const url = 'add/' + this.steps[this.selectedStepIndex].path;
    console.log(url, this.steps);
    this.router.navigate([url]);
  }

  cancelAndGoBack() {
    this.formFacade.clear();
    this.router.navigate(['list']);
  }
}
