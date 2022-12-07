import { Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ListPageComponent,
  },
  {
    path: 'todo/:id',
    component: DetailPageComponent,
  },
];
