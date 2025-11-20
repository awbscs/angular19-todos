import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppState } from '../../../core/store/app.state';
import { loadTodo, deleteTodo } from '../../store/todo.actions';
import { selectSelectedTodo, selectTodoLoading, selectTodoError } from '../../store/todo.selectors';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="todo-detail-container">
      <div *ngIf="loading$ | async" class="loading-container">
        <mat-spinner></mat-spinner>
      </div>

      <div *ngIf="error$ | async as error" class="error-message">
        {{ error }}
      </div>

      <mat-card *ngIf="todo$ | async as todo" class="todo-card">
        <mat-card-header>
          <mat-card-title>Todo Details</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="detail-section">
            <h3>Description</h3>
            <p>{{ todo.todo }}</p>
          </div>
          <div class="detail-section">
            <h3>Status</h3>
            <mat-chip [color]="todo.completed ? 'primary' : 'accent'">
              {{ todo.completed ? 'Completed' : 'Todo' }}
            </mat-chip>
          </div>
          <div class="detail-section">
            <h3>User ID</h3>
            <p>{{ todo.userId }}</p>
          </div>
          <div class="detail-section">
            <h3>Todo ID</h3>
            <p>{{ todo.id }}</p>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="onEdit()">
            <mat-icon>edit</mat-icon>
            Edit
          </button>
          <button mat-raised-button color="warn" (click)="onDelete()">
            <mat-icon>delete</mat-icon>
            Delete
          </button>
          <button mat-button (click)="onBack()">
            <mat-icon>arrow_back</mat-icon>
            Back to List
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .todo-detail-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .todo-card {
      margin-top: 20px;
    }
    .detail-section {
      margin-bottom: 24px;
    }
    .detail-section h3 {
      margin-bottom: 8px;
      color: #666;
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }
    .detail-section p {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    mat-card-actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
  `]
})
export class TodoDetailComponent implements OnInit {
  todo$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.todo$ = this.store.select(selectSelectedTodo);
    this.loading$ = this.store.select(selectTodoLoading);
    this.error$ = this.store.select(selectTodoError);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadTodo({ id: +id }));
    }
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

  onEdit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.router.navigate(['/todos', id, 'edit']);
    }
  }

  onDelete(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && confirm('Are you sure you want to delete this todo?')) {
      this.store.dispatch(deleteTodo({ id: +id }));
    }
  }

  onBack(): void {
    this.router.navigate(['/todos']);
  }
}

