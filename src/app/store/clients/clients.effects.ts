import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {
  addClient,
  addClientFailure,
  addClientSuccess,
  getClients,
  loadClients,
  loadClientsFromApi,
  loadClientsFromApiFailure,
  removeClient,
  removeClientFailure,
  removeClientSuccess,
} from './clients.actions';
import { ClientsState } from './clients.state';

@Injectable()
export class ClientsEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
  private store = inject(Store<{ clients: ClientsState }>);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  loadClientsFromApi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadClientsFromApi),
      mergeMap(() =>
        this.apiService.getClients().pipe(
          map(clients => loadClients({ clients })),
          catchError(error => of(loadClientsFromApiFailure({ error })))
        )
      )
    )
  );

  loadClientsFromApiFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadClientsFromApiFailure),
        tap(({ error }) => {
          console.error('Error loading clients', error);
          this.snackBar.open('Failed to load clients. Try again later.', 'Close', { duration: 3000 });
        })
      ),
    { dispatch: false }
  );

  getClientsState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getClients),
      withLatestFrom(this.store),
      mergeMap(([_, state]) => {
        const clients = state.clients.clients;
        return clients && clients.length > 0 ? of(loadClients({ clients })) : of(loadClientsFromApi());
      })
    )
  );

  addClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClient),
      mergeMap(({ client }) =>
        this.apiService.addClient(client).pipe(
          map(() => addClientSuccess()),
          catchError(error => of(addClientFailure({ error })))
        )
      )
    )
  );

  addClientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addClientSuccess),
      tap(() => {
        this.snackBar.open('Client added successfully!', 'OK', { duration: 3000 });
        this.router.navigate(['/list']);
      }),
      map(() => loadClientsFromApi())
    )
  );

  addClientFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addClientFailure),
        tap(({ error }) => {
          console.error('Error adding client', error);
          this.snackBar.open('Failed to add client. Try again later.', 'Close', { duration: 3000 });
        })
      ),
    { dispatch: false }
  );

  removeClient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeClient),
      mergeMap(({ id }) =>
        this.apiService.removeClient(id).pipe(
          map(() => removeClientSuccess()),
          catchError(error => of(removeClientFailure({ error })))
        )
      )
    )
  );

  removeClientSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeClientSuccess),
      tap(() => {
        this.snackBar.open('Client removed successfully!', 'OK', { duration: 3000 });
      }),
      map(() => loadClientsFromApi())
    )
  );

  removeClientFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(removeClientFailure),
        tap(({ error }) => {
          console.error('Error removing client', error);
          this.snackBar.open('Failed to remove client. Try again later.', 'Close', { duration: 3000 });
        })
      ),
    { dispatch: false }
  );
}
