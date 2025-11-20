import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list.component';
import { loadTodos, deleteTodo, updateTodoStatus } from '../../store/todo.actions';
import { Todo } from '../../../core/models/todo.model';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;

  const mockTodos: Todo[] = [
    { id: 1, todo: 'Test todo 1', completed: false, userId: 1 },
    { id: 2, todo: 'Test todo 2', completed: true, userId: 1 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent, BrowserAnimationsModule],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            todos: {
              todos: mockTodos,
              selectedTodo: null,
              loading: false,
              error: null
            }
          }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTodos on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(loadTodos());
  });

  it('should dispatch deleteTodo when onDeleteTodo is called', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    spyOn(window, 'confirm').and.returnValue(true);
    component.onDeleteTodo(1);
    expect(dispatchSpy).toHaveBeenCalledWith(deleteTodo({ id: 1 }));
  });
});

