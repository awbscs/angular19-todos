import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.state';
import { Todo } from '../../core/models/todo.model';

export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state: TodoState) => state.todos
);

export const selectTodoById = (id: number) => createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.find(todo => todo.id === id)
);

export const selectSelectedTodo = createSelector(
  selectTodoState,
  (state: TodoState) => state.selectedTodo
);

export const selectTodosByStatus = (completed: boolean) => createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter(todo => todo.completed === completed)
);

export const selectIncompleteTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter(todo => !todo.completed)
);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos: Todo[]) => todos.filter(todo => todo.completed)
);

export const selectTodoLoading = createSelector(
  selectTodoState,
  (state: TodoState) => state.loading
);

export const selectTodoError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);

