import { AuthState } from '../../auth/store/auth.state';
import { TodoState } from '../../todos/store/todo.state';

export interface AppState {
  auth: AuthState;
  todos: TodoState;
}

