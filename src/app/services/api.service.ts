import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`getClients`);
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`getClientById?id=${id}`);
  }

  addClient(data: Partial<Client>) {
    return this.http.post<Client>(`addClient`, data);
  }

  updateClient(id: string, data: Client) {
    return this.http.put<Client>(`updateClient?id=${id}`, data);
  }

  removeClient(id: string) {
    return this.http.delete<string>(`removeClient?id=${id}`);
  }
}
