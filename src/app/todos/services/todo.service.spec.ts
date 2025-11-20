import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../../core/models/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todos for a user', () => {
    const userId = 1;
    const mockTodos: Todo[] = [
      { id: 1, todo: 'Test todo', completed: false, userId: 1 }
    ];

    service.getTodos(userId).subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne(`http://localhost:3000/todos/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush({ todos: mockTodos });
  });

  it('should get a single todo', () => {
    const todoId = 1;
    const mockTodo: Todo = { id: 1, todo: 'Test todo', completed: false, userId: 1 };

    service.getTodo(todoId).subscribe(todo => {
      expect(todo).toEqual(mockTodo);
    });

    const req = httpMock.expectOne(`http://localhost:3000/todos/${todoId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodo);
  });

  it('should create a todo', () => {
    const newTodo = { todo: 'New todo', completed: false, userId: 1 };
    const mockResponse: Todo = { id: 2, ...newTodo };

    service.createTodo(newTodo).subscribe(todo => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update a todo', () => {
    const todoId = 1;
    const updateData = { completed: true };
    const mockResponse: Todo = { id: 1, todo: 'Test todo', completed: true, userId: 1 };

    service.updateTodo(todoId, updateData).subscribe(todo => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/todos/${todoId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });

  it('should delete a todo', () => {
    const todoId = 1;

    service.deleteTodo(todoId).subscribe(() => {
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/todos/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

