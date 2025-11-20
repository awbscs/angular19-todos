export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface CreateTodoRequest {
  todo: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  todo?: string;
  completed?: boolean;
}

