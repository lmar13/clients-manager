import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Client } from '../../models/client.model';

@Component({
  selector: 'dialog-animations-example-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 mat-dialog-title>Delete client</h2>
    <mat-dialog-content>
      Would you like to delete this client? <br /><br />
      ID: {{ client().id }}<br />
      NAME: {{ client().name }}<br />
      SURNAME: {{ client().surname }}<br />
      PHONE: {{ client().phone }}<br />
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>No</button>
      <button mat-button [mat-dialog-close]="client().id" cdkFocusInitial>Ok</button>
    </mat-dialog-actions>`,
})
export class ConfirmationDialog {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialog>);
  readonly data = inject<Client>(MAT_DIALOG_DATA);
  readonly client = model(this.data);
}
