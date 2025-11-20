import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '../../core/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTodos(userId: number): Observable<Todo[]> {
    return this.http.get<{ todos: Todo[] }>(`${this.apiUrl}/todos/user/${userId}`).pipe(
      map((response: { todos: Todo[] }) => response.todos || [])
    );
  }

  getTodo(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/todos/${id}`);
  }

  createTodo(todo: CreateTodoRequest & { userId: number }): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/todos`, todo);
  }

  updateTodo(id: number, todo: UpdateTodoRequest): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/todos/${id}`, todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/todos/${id}`);
  }
}

