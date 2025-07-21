import { Routes } from '@angular/router';
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
  },
  {
    path: 'edit/:id',
    component: FormsComponent,
    resolve: { client: ClientResolver },
  },
];
