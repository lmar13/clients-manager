import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Client } from '../../models/client.model';
import { addClient, getClients, removeClient } from './clients.actions';
import { ClientsFacade } from './clients.facade';

describe('ClientsFacade', () => {
  let facade: ClientsFacade;
  let store: Store;
  const mockClient: Client[] = [
    { id: '1', name: 'Client 1', surname: 'Surname 1', phone: '123456789', interests: ['music'] },
    { id: '2', name: 'Client 2', surname: 'Surname 2', phone: '987654321', interests: ['sports'] },
  ];

  beforeEach(() => {
    const storeMock = {
      select: jasmine.createSpy('select').and.returnValue(of(mockClient)),
      dispatch: jasmine.createSpy('dispatch'),
    };

    TestBed.configureTestingModule({
      providers: [ClientsFacade, { provide: Store, useValue: storeMock }],
    });

    facade = TestBed.inject(ClientsFacade);
    store = TestBed.inject(Store);
  });

  it('should select clients$ observable', done => {
    facade.clients$.subscribe(clients => {
      expect(clients).toEqual(mockClient);
      done();
    });

    expect(store.select).toHaveBeenCalled();
  });

  it('should dispatch getClients action on setClients()', () => {
    facade.setClients();
    expect(store.dispatch).toHaveBeenCalledWith(getClients());
  });

  it('should dispatch addClient action on addClient()', () => {
    const client = { name: 'John Doe' };
    facade.addClient(client);
    expect(store.dispatch).toHaveBeenCalledWith(addClient({ client }));
  });

  it('should dispatch removeClient action on removeClient()', () => {
    const id = 'abc123';
    facade.removeClient(id);
    expect(store.dispatch).toHaveBeenCalledWith(removeClient({ id }));
  });
});
