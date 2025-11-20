import { createReducer, on } from '@ngrx/store';
import { TodoState, initialTodoState } from './todo.state';
import * as TodoActions from './todo.actions';

export const todoReducer = createReducer(
  initialTodoState,
  on(TodoActions.loadTodos, (state): TodoState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodosSuccess, (state, { todos }): TodoState => ({
    ...state,
    todos,
    loading: false,
    error: null
  })),
  on(TodoActions.loadTodosFailure, (state, { error }): TodoState => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.loadTodo, (state): TodoState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.loadTodoSuccess, (state, { todo }): TodoState => ({
    ...state,
    selectedTodo: todo,
    loading: false,
    error: null
  })),
  on(TodoActions.loadTodoFailure, (state, { error }): TodoState => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.createTodo, (state): TodoState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TodoActions.createTodoSuccess, (state, { todo }): TodoState => ({
    ...state,
    todos: [...state.todos, todo],
    loading: false,
    error: null
  })),
  on(TodoActions.createTodoFailure, (state, { error }): TodoState => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.updateTodoSuccess, (state, { todo }): TodoState => ({
    ...state,
    todos: state.todos.map(t => t.id === todo.id ? todo : t),
    selectedTodo: state.selectedTodo?.id === todo.id ? todo : state.selectedTodo,
    loading: false,
    error: null
  })),
  on(TodoActions.updateTodoFailure, (state, { error }): TodoState => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }): TodoState => ({
    ...state,
    todos: state.todos.filter(t => t.id !== id),
    selectedTodo: state.selectedTodo?.id === id ? null : state.selectedTodo,
    loading: false,
    error: null
  })),
  on(TodoActions.deleteTodoFailure, (state, { error }): TodoState => ({
    ...state,
    loading: false,
    error
  })),
  on(TodoActions.updateTodoStatus, (state, { id, completed }): TodoState => ({
    ...state,
    todos: state.todos.map(t => t.id === id ? { ...t, completed } : t)
  }))
);

