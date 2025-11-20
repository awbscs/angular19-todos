import { Todo } from '../../core/models/todo.model';

export interface TodoState {
  todos: Todo[];
  selectedTodo: Todo | null;
  loading: boolean;
  error: string | null;
}

export const initialTodoState: TodoState = {
  todos: [],
  selectedTodo: null,
  loading: false,
  error: null
};

