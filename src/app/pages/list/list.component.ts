import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  imports: [NgFor, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private apiService = inject(ApiService);
  clients$ = this.apiService.getClients();
}
