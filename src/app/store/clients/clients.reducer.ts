import { createReducer, on } from '@ngrx/store';
import { loadClients, loadClientsFromApi } from './clients.actions';
import { initialState } from './clients.state';

export const clientsReducer = createReducer(
  initialState,

  on(loadClientsFromApi, state => ({
    ...state,
  })),

  on(loadClients, (state, { clients }) => ({
    ...state,
    clients,
  }))
);
