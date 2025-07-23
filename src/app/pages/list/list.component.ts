import { Component, inject, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../../components/confirmation-dialog/confiramtion-dialog.component';
import { Client } from '../../models/client.model';
import { InterestsNamesPipe } from '../../shared/pipes/interests-names.pipe';
import { ClientsFacade } from '../../store/clients/clients.facade';
import { FormFacade } from '../../store/form.facade';

@Component({
  selector: 'app-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    InterestsNamesPipe,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private clientsFacade = inject(ClientsFacade);
  private formFacade = inject(FormFacade);
  displayedColumns = ['index', 'name', 'surname', 'phone', 'interest', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  loading = false;

  constructor() {
    this.loading = true;
    this.clientsFacade.setClients();
    this.clientsFacade.clients$.pipe(takeUntilDestroyed()).subscribe(clients => {
      this.dataSource.data = clients.clients;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  dataSource = new MatTableDataSource<Client>();

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  onEdit(id: string) {
    this.router.navigate(['/edit', id]);
  }

  onAdd() {
    this.formFacade.clear();
    this.router.navigate(['/add']);
  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: client,
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(id => {
      if (!id) return;

      this.clientsFacade.removeClient(id);
    });
  }
}
