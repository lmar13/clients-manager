import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { apiUrlInterceptor } from './core/api-url.interceptor';
import { routes } from './routes/app.routes';
import { ClientsEffects } from './store/clients/clients.effects';
import { clientsReducer } from './store/clients/clients.reducer';
import { currentStepReducer } from './store/currentStep/currentStep.reducer';
import { step1Reducer } from './store/step1/step1.reducer';
import { step2Reducer } from './store/step2/step2.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([apiUrlInterceptor])),
    provideStore({
      step1: step1Reducer,
      step2: step2Reducer,
      currentStep: currentStepReducer,
      clients: clientsReducer,
    }),
    provideEffects([ClientsEffects]),
    ...(isDevMode() ? [provideStoreDevtools()] : []),
  ],
};
