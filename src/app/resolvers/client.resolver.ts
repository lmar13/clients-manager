import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { ApiService } from '../services/api.service';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<Client> {
  private apiService = inject(ApiService);
  resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    return this.apiService.getClientById(route.paramMap.get('id')!);
  }
}
