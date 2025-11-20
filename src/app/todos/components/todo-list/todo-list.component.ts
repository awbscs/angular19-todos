import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppState } from '../../../core/store/app.state';
import { loadTodos, updateTodoStatus, deleteTodo } from '../../store/todo.actions';
import { selectIncompleteTodos, selectCompletedTodos, selectTodoLoading, selectTodoError } from '../../store/todo.selectors';
import { Todo } from '../../../core/models/todo.model';
import { listAnimation, fadeIn } from '../../../animations';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule
  ],
  animations: [fadeIn, listAnimation],
  template: `
    <div class="todo-list-container" [@fadeIn]>
      <div class="header" [@fadeIn]>
        <h1>My Todos</h1>
        <button mat-raised-button color="primary" (click)="onCreateTodo()">
          <mat-icon>add</mat-icon>
          New Todo
        </button>
      </div>

      <div *ngIf="loading$ | async" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="error-message">
        {{ error }}
      </div>

      <div class="todo-boards" *ngIf="!(loading$ | async)" [@listAnimation]>
        <div class="todo-column">
          <h2>Todo ({{ (incompleteTodos$ | async)?.length || 0 }})</h2>
          <div
             cdkDropList
            id="todoList"
            [cdkDropListData]="(incompleteTodos$ | async) || []"
            [cdkDropListConnectedTo]="['completedList']"
            class="todo-list"
            (cdkDropListDropped)="onDrop($event, false)">
            <div
              *ngFor="let todo of (incompleteTodos$ | async) || []"
              cdkDrag
              class="todo-item"
              [@fadeIn]
              (click)="onViewTodo(todo.id)">
              <div class="todo-content">
                <span class="todo-text">{{ todo.todo }}</span>
                <div class="todo-actions">
                  <button mat-icon-button (click)="onEditTodo(todo.id); $event.stopPropagation()">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="onDeleteTodo(todo.id); $event.stopPropagation()">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            </div>
            <div *ngIf="(incompleteTodos$ | async)?.length === 0" class="empty-state">
              No todos yet. Create one!
            </div>
          </div>
        </div>

        <div class="todo-column">
          <h2>Completed ({{ (completedTodos$ | async)?.length || 0 }})</h2>
          <div
            cdkDropList
            id="completedList"
            [cdkDropListData]="(completedTodos$ | async) || []"
            [cdkDropListConnectedTo]="['todoList']"
            class="todo-list completed"
            (cdkDropListDropped)="onDrop($event, true)">
            <div
              *ngFor="let todo of (completedTodos$ | async) || []"
              cdkDrag
              class="todo-item completed"
              [@fadeIn]
              (click)="onViewTodo(todo.id)">
              <div class="todo-content">
                <span class="todo-text">{{ todo.todo }}</span>
                <div class="todo-actions">
                  <button mat-icon-button (click)="onEditTodo(todo.id); $event.stopPropagation()">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="onDeleteTodo(todo.id); $event.stopPropagation()">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </div>
            </div>
            <div *ngIf="(completedTodos$ | async)?.length === 0" class="empty-state">
              No completed todos yet.
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .todo-list-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }
    .header h1 {
      margin: 0;
    }
    .todo-boards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .todo-column {
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .todo-column h2 {
      margin-top: 0;
      margin-bottom: 20px;
      color: #333;
    }
    .todo-list {
      min-height: 400px;
      padding: 10px;
    }
    .todo-item {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
      margin-bottom: 10px;
      cursor: move;
      transition: all 0.2s;
    }
    .todo-item:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      transform: translateY(-2px);
    }
    .todo-item.completed {
      background: #e8f5e9;
      border-color: #4caf50;
    }
    .todo-item.cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .todo-list.cdk-drop-list-dragging .todo-item:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
    .todo-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .todo-text {
      flex: 1;
      word-break: break-word;
    }
    .todo-actions {
      display: flex;
      gap: 5px;
    }
    .empty-state {
      text-align: center;
      color: #999;
      padding: 40px 20px;
      font-style: italic;
    }
    .cdk-drag-placeholder {
      opacity: 0.5;
    }
    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    @media (max-width: 768px) {
      .todo-boards {
        grid-template-columns: 1fr;
      }
      .header {
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
      }
    }
  `]
})
export class TodoListComponent implements OnInit {
  incompleteTodos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.incompleteTodos$ = this.store.select(selectIncompleteTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);
    this.loading$ = this.store.select(selectTodoLoading);
    this.error$ = this.store.select(selectTodoError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    });
  }

  onDrop(event: CdkDragDrop<Todo[]>, targetCompleted: boolean): void {
    if (event.previousContainer === event.container) {
      // Reordering within the same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between containers
      const todo = event.previousContainer.data[event.previousIndex];
      if (todo && todo.completed !== targetCompleted) {
        // Perform visual transfer for immediate feedback
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        // Dispatch action to persist the change via API
        this.store.dispatch(updateTodoStatus({ id: todo.id, completed: targetCompleted }));
      }
    }
  }

  onCreateTodo(): void {
    this.router.navigate(['/todos/new']);
  }

  onViewTodo(id: number): void {
    this.router.navigate(['/todos', id]);
  }

  onEditTodo(id: number): void {
    this.router.navigate(['/todos', id, 'edit']);
  }

  onDeleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.store.dispatch(deleteTodo({ id }));
    }
  }
}

