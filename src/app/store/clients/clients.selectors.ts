import { createFeatureSelector } from '@ngrx/store';
import { ClientsState } from './clients.state';

export const selectClients = createFeatureSelector<ClientsState>('clients');
