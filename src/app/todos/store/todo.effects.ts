import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { TodoService } from '../services/todo.service';
import { AppState } from '../../core/store/app.state';
import { selectCurrentUser } from '../../auth/store/auth.selectors';
import {
  loadTodos,
  loadTodosSuccess,
  loadTodosFailure,
  loadTodo,
  loadTodoSuccess,
  loadTodoFailure,
  createTodo,
  createTodoSuccess,
  createTodoFailure,
  updateTodo,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodo,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoStatus
} from './todo.actions';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private todoService = inject(TodoService);
  private store = inject<Store<AppState>>(Store);
  private router = inject(Router);
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([action, user]) =>
        this.todoService.getTodos(user?.id || 0).pipe(
          map(todos => loadTodosSuccess({ todos })),
          catchError(error => of(loadTodosFailure({ error: error.message || 'Failed to load todos' })))
        )
      )
    )
  );

  loadTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodo),
      switchMap(({ id }) =>
        this.todoService.getTodo(id).pipe(
          map(todo => loadTodoSuccess({ todo })),
          catchError(error => of(loadTodoFailure({ error: error.message || 'Failed to load todo' })))
        )
      )
    )
  );

  createTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTodo),
      withLatestFrom(this.store.select(selectCurrentUser)),
      switchMap(([{ todo }, user]) =>
        this.todoService.createTodo({ ...todo, userId: user?.id || 0 }).pipe(
          map(newTodo => {
            this.router.navigate(['/todos']);
            return createTodoSuccess({ todo: newTodo });
          }),
          catchError(error => of(createTodoFailure({ error: error.message || 'Failed to create todo' })))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(({ id, todo }) =>
        this.todoService.updateTodo(id, todo).pipe(
          map(updatedTodo => {
            this.router.navigate(['/todos']);
            return updateTodoSuccess({ todo: updatedTodo });
          }),
          catchError(error => of(updateTodoFailure({ error: error.message || 'Failed to update todo' })))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => {
            this.router.navigate(['/todos']);
            return deleteTodoSuccess({ id });
          }),
          catchError(error => of(deleteTodoFailure({ error: error.message || 'Failed to delete todo' })))
        )
      )
    )
  );

  updateTodoStatus$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodoStatus),
      switchMap(({ id, completed }) =>
        this.todoService.updateTodo(id, { completed }).pipe(
          map(todo => updateTodoSuccess({ todo })),
          catchError(error => of(updateTodoFailure({ error: error.message || 'Failed to update todo status' })))
        )
      )
    )
  );


}

