import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './routes/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    ...(isDevMode() ? [provideStoreDevtools()] : []),
  ],
};
