import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

export const selectClientsState = createFeatureSelector<ClientsState>('clients');

export const selectClients = createSelector(selectClientsState, (state: ClientsState) => state.clients);
