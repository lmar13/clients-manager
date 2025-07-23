import { createAction, props } from '@ngrx/store';
import { Client } from '../../models/client.model';

export const loadClientsFromApi = createAction('[Clients] Load Clients From Api');
export const loadClientsFromApiSuccess = createAction(
  '[Clients] Load Clients From Api Success',
  props<{ clients: Client[] }>()
);
export const loadClientsFromApiFailure = createAction(
  '[Clients] Load Clients From Api Failure',
  props<{ error: unknown }>()
);

export const loadClients = createAction('[Clients] Load Clients', props<{ clients: Client[] }>());

export const getClients = createAction('[Clients] Get Clients');

export const addClient = createAction('[Clients] Add Client', props<{ client: Partial<Client> }>());
export const addClientSuccess = createAction('[Clients] Add Client Success');
export const addClientFailure = createAction('[Clients] Add Client Failure', props<{ error: unknown }>());

export const removeClient = createAction('[Clients] Remove Client', props<{ id: string }>());
export const removeClientSuccess = createAction('[Clients] Remove Client Success');
export const removeClientFailure = createAction('[Clients] Remove Client Failure', props<{ error: unknown }>());
