import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },

  {
    path: 'list',
    loadComponent: () => import('../pages/list/list.component').then(m => m.ListComponent),
  },

  {
    path: 'add',
    loadComponent: () => import('../pages/forms/forms.component').then(m => m.FormsComponent),
    children: [
      {
        path: 'step-1',
        loadComponent: () => import('../components/step1/step1.component').then(m => m.Step1Component),
      },
      {
        path: 'step-2',
        loadComponent: () => import('../components/step2/step2.component').then(m => m.Step2Component),
      },
      {
        path: 'step-3',
        loadComponent: () => import('../components/step3/step3.component').then(m => m.Step3Component),
      },
      { path: '', redirectTo: 'step-1', pathMatch: 'full' },
    ],
  },
];
