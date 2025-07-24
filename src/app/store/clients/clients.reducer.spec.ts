import { Client } from '../../models/client.model';
import { loadClients, loadClientsFromApi } from './clients.actions';
import { clientsReducer } from './clients.reducer';
import { initialState } from './clients.state';

describe('clientsReducer', () => {
  it('should return the initial state when called with undefined state', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action = { type: 'unknown' } as any;
    const state = clientsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadClientsFromApi action and return the same state', () => {
    const prevState = {
      ...initialState,
      clients: [{ id: '1', name: 'Client 1', surname: 'Surname 1', phone: '123456789', interests: ['music'] }],
    };
    const action = loadClientsFromApi();
    const state = clientsReducer(prevState, action);
    expect(state).toEqual(prevState);
  });

  it('should handle loadClients action and update the clients array', () => {
    const clientsPayload: Client[] = [
      { id: '1', name: 'Client 1', surname: 'Surname 1', phone: '123456789', interests: ['music'] },
      { id: '2', name: 'Client 2', surname: 'Surname 2', phone: '987654321', interests: ['sports'] },
    ];
    const action = loadClients({ clients: clientsPayload });
    const state = clientsReducer(initialState, action);
    expect(state.clients).toEqual(clientsPayload);
  });
});
