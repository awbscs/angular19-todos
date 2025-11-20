import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from '../../auth/store/auth.reducer';
import { todoReducer } from '../../todos/store/todo.reducer';
import { AppState } from './app.state';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  todos: todoReducer
};

