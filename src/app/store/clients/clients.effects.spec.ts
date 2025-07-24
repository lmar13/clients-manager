import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as ClientsActions from './clients.actions';
import { ClientsEffects } from './clients.effects';
import { initialState } from './clients.state';

describe('ClientsEffects', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let actions$: Observable<any>;
  let effects: ClientsEffects;
  let apiService: jasmine.SpyObj<ApiService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let router: jasmine.SpyObj<Router>;
  let store: MockStore;
  let consoleErrorSpy: jasmine.Spy;

  const mockClients = [{ id: '1', name: 'John', surname: 'Doe', phone: '123', interests: ['reading'] }];
  const mockClient = { id: '2', name: 'Jane', surname: 'Smith', phone: '456', interests: ['sports'] };
  const error = new Error('Test error');

  beforeEach(() => {
    const apiSpy = jasmine.createSpyObj('ApiService', ['getClients', 'addClient', 'removeClient']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleErrorSpy = spyOn(console, 'error').and.callFake(() => {});

    TestBed.configureTestingModule({
      providers: [
        ClientsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: ApiService, useValue: apiSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    effects = TestBed.inject(ClientsEffects);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    store = TestBed.inject(MockStore);
  });

  afterEach(() => {
    consoleErrorSpy.and.callThrough();
  });

  // --- loadClientsFromApi$ ---
  describe('loadClientsFromApi$', () => {
    it('should dispatch loadClients on success', async () => {
      apiService.getClients.and.returnValue(of(mockClients));
      actions$ = of(ClientsActions.loadClientsFromApi());

      const action = await firstValueFrom(effects.loadClientsFromApi$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.loadClients({ clients: mockClients }));
    });

    it('should dispatch loadClientsFromApiFailure on error', async () => {
      apiService.getClients.and.returnValue(throwError(() => error));
      actions$ = of(ClientsActions.loadClientsFromApi());

      const action = await firstValueFrom(effects.loadClientsFromApi$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.loadClientsFromApiFailure({ error }));
    });
  });

  // --- loadClientsFromApiFailure$ ---
  describe('loadClientsFromApiFailure$', () => {
    it('should show snackbar on failure', async () => {
      actions$ = of(ClientsActions.loadClientsFromApiFailure({ error }));

      await firstValueFrom(effects.loadClientsFromApiFailure$.pipe(take(1)));

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith('Failed to load clients. Try again later.', 'Close', {
        duration: 3000,
      });
    });
  });

  // --- getClientsState$ ---
  describe('getClientsState$', () => {
    it('should dispatch loadClients if clients exist in store', async () => {
      store.setState({ clients: { clients: mockClients } });
      actions$ = of(ClientsActions.getClients());

      const action = await firstValueFrom(effects.getClientsState$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.loadClients({ clients: mockClients }));
    });

    it('should dispatch loadClientsFromApi if clients empty in store', async () => {
      store.setState({ clients: { clients: [] } });
      actions$ = of(ClientsActions.getClients());

      const action = await firstValueFrom(effects.getClientsState$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.loadClientsFromApi());
    });
  });

  // --- addClient$ ---
  describe('addClient$', () => {
    it('should dispatch addClientSuccess on API success', async () => {
      apiService.addClient.and.returnValue(of(mockClient));
      actions$ = of(ClientsActions.addClient({ client: mockClient }));

      const action = await firstValueFrom(effects.addClient$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.addClientSuccess());
    });

    it('should dispatch addClientFailure on API error', async () => {
      apiService.addClient.and.returnValue(throwError(() => error));
      actions$ = of(ClientsActions.addClient({ client: mockClient }));

      const action = await firstValueFrom(effects.addClient$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.addClientFailure({ error }));
    });
  });

  // --- addClientSuccess$ ---
  describe('addClientSuccess$', () => {
    it('should show snackbar, navigate, and dispatch loadClientsFromApi', async () => {
      actions$ = of(ClientsActions.addClientSuccess());

      const action = await firstValueFrom(effects.addClientSuccess$.pipe(take(1)));

      expect(snackBar.open).toHaveBeenCalledWith('Client added successfully!', 'OK', { duration: 3000 });
      expect(router.navigate).toHaveBeenCalledWith(['/list']);
      expect(action).toEqual(ClientsActions.loadClientsFromApi());
    });
  });

  // --- addClientFailure$ ---
  describe('addClientFailure$', () => {
    it('should show snackbar on failure', async () => {
      actions$ = of(ClientsActions.addClientFailure({ error }));

      await firstValueFrom(effects.addClientFailure$.pipe(take(1)));

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith('Failed to add client. Try again later.', 'Close', {
        duration: 3000,
      });
    });
  });

  // --- removeClient$ ---
  describe('removeClient$', () => {
    it('should dispatch removeClientSuccess on API success', async () => {
      apiService.removeClient.and.returnValue(of('1'));
      actions$ = of(ClientsActions.removeClient({ id: '1' }));

      const action = await firstValueFrom(effects.removeClient$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.removeClientSuccess());
    });

    it('should dispatch removeClientFailure on API error', async () => {
      apiService.removeClient.and.returnValue(throwError(() => error));
      actions$ = of(ClientsActions.removeClient({ id: '1' }));

      const action = await firstValueFrom(effects.removeClient$.pipe(take(1)));
      expect(action).toEqual(ClientsActions.removeClientFailure({ error }));
    });
  });

  // --- removeClientSuccess$ ---
  describe('removeClientSuccess$', () => {
    it('should show snackbar and dispatch loadClientsFromApi', async () => {
      actions$ = of(ClientsActions.removeClientSuccess());

      const action = await firstValueFrom(effects.removeClientSuccess$.pipe(take(1)));

      expect(snackBar.open).toHaveBeenCalledWith('Client removed successfully!', 'OK', { duration: 3000 });
      expect(action).toEqual(ClientsActions.loadClientsFromApi());
    });
  });

  // --- removeClientFailure$ ---
  describe('removeClientFailure$', () => {
    it('should show snackbar on failure', async () => {
      actions$ = of(ClientsActions.removeClientFailure({ error }));

      await effects.removeClientFailure$.pipe(take(1)).toPromise();

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(snackBar.open).toHaveBeenCalledWith('Failed to remove client. Try again later.', 'Close', {
        duration: 3000,
      });
    });
  });
});
