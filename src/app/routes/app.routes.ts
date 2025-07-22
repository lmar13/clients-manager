import { Routes } from '@angular/router';
import { Step1Component } from '../components/step1/step1.component';
import { Step2Component } from '../components/step2/step2.component';
import { Step3Component } from '../components/step3/step3.component';
import { FormsComponent } from '../pages/forms/forms.component';
import { ListComponent } from '../pages/list/list.component';
import { ClientResolver } from '../resolvers/client.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'add',
    component: FormsComponent,
    children: [
      {
        path: 'step-1',
        component: Step1Component,
      },
      {
        path: 'step-2',
        component: Step2Component,
      },
      {
        path: 'step-3',
        component: Step3Component,
      },
      { path: '', redirectTo: 'step-1', pathMatch: 'full' },
    ],
  },
  {
    path: 'edit/:id',
    component: FormsComponent,
    resolve: { client: ClientResolver },
    children: [
      {
        path: 'step-1',
        component: Step1Component,
      },
      {
        path: 'step-2',
        component: Step2Component,
      },
      {
        path: 'step-3',
        component: Step3Component,
      },
      { path: '', redirectTo: 'step-1', pathMatch: 'full' },
    ],
  },
];
