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
    console.log(this.baseUrl);
    return this.http.get<Client[]>(`${this.baseUrl}/getClients`);
  }

  // addClient(data: Client) {

  // }

  // updateClient(data: Client) {

  // }

  // removeClient(id: string) {

  // }

  // getInterest(): Observable<Interest[]> {

  // }

  // addInterest(data: Interest) {

  // }

  // removeInterest(id: string) {

  // }
}
