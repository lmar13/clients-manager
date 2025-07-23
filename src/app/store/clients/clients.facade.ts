import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from './../../models/client.model';
import { addClient, getClients, removeClient } from './clients.actions';
import { selectClients } from './clients.selectors';

@Injectable({ providedIn: 'root' })
export class ClientsFacade {
  private store = inject(Store);

  get clients$() {
    return this.store.select(selectClients);
  }

  setClients() {
    this.store.dispatch(getClients());
  }

  addClient(client: Partial<Client>) {
    this.store.dispatch(addClient({ client }));
  }

  removeClient(id: string) {
    this.store.dispatch(removeClient({ id }));
  }
}
