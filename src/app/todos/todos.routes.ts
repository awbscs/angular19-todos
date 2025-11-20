import { Routes } from '@angular/router';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/todo-list/todo-list.component').then(m => m.TodoListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/todo-form/todo-form.component').then(m => m.TodoFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/todo-detail/todo-detail.component').then(m => m.TodoDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/todo-form/todo-form.component').then(m => m.TodoFormComponent)
  }
];

