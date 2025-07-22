import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgFor } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Step2Facade } from '../../store/step2/step2.facade';

@Component({
  selector: 'app-step2',
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, NgFor, MatButtonModule],
  templateUrl: './step2.component.html',
  styleUrl: './step2.component.scss',
})
export class Step2Component {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private facade$ = inject(Step2Facade);

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly addOnBlur = true;
  readonly interests: WritableSignal<string[]> = signal([]);

  next() {
    this.facade$.update({ interests: this.interests() });
    this.router.navigate(['add/step-3']);
  }

  prev() {
    this.facade$.update({ interests: this.interests() });
    this.router.navigate(['../step-1'], { relativeTo: this.route });
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
