import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'todos',
    loadChildren: () => import('./todos/todos.routes').then(m => m.TODOS_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/todos'
  }
];

