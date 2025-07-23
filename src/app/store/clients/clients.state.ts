import { Client } from './../../models/client.model';

export interface ClientsState {
  clients: Client[];
}
export const initialState: ClientsState = {
  clients: [],
};
