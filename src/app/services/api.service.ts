import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.baseUrl}/getClients`);
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/getClientById?id=${id}`);
  }

  addClient(data: Client) {
    this.http.post<Client>(`${this.baseUrl}/addClient`, data);
  }

  updateClient(id: string, data: Client) {
    this.http.put<Client>(`${this.baseUrl}/updateClient?id=${id}`, data);
  }

  removeClient(id: string) {
    this.http.delete<string>(`${this.baseUrl}/removeClient?id=${id}`);
  }
}
