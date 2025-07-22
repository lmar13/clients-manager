import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmationDialog } from '../../components/confirmation-dialog/confiramtion-dialog.component';
import { Client } from '../../models/client.model';
import { ApiService } from '../../services/api.service';
import { InterestsNamesPipe } from '../../shared/pipes/interests-names.pipe';

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
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, AfterViewInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  clients$ = this.apiService.getClients();
  displayedColumns = ['index', 'name', 'surname', 'phone', 'interest', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  dataSource = new MatTableDataSource<Client>();

  ngOnInit() {
    this.refreshClients();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  onEdit(id: string) {
    this.router.navigate(['/edit', id]);
  }

  onAdd() {
    this.router.navigate(['/add']);
  }

  openDialog(client: Client): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: client,
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(id => {
      if (!id) return;

      this.apiService.removeClient(id).subscribe(() => {
        this.refreshClients();
      });
    });
  }

  private refreshClients() {
    this.clients$.subscribe(clients => {
      this.dataSource.data = clients;
    });
  }
}
