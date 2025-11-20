import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppState } from '../../../core/store/app.state';
import { createTodo, updateTodo, loadTodo } from '../../store/todo.actions';
import { selectSelectedTodo, selectTodoLoading, selectTodoError } from '../../store/todo.selectors';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="todo-form-container">
      <mat-card class="form-card">
        <mat-card-header>
          <mat-card-title>{{ isEditMode ? 'Edit Todo' : 'Create New Todo' }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="todoForm" (ngSubmit)="onSubmit()">
            <mat-form-field class="full-width">
              <mat-label>Todo Description</mat-label>
              <textarea
                matInput
                formControlName="todo"
                rows="4"
                placeholder="Enter todo description"
                required></textarea>
              <mat-error *ngIf="todoForm.get('todo')?.hasError('required')">
                Todo description is required
              </mat-error>
              <mat-error *ngIf="todoForm.get('todo')?.hasError('pattern')">
                Description cannot be only whitespace
              </mat-error>
            </mat-form-field>

            <mat-checkbox formControlName="completed" class="full-width">
              Completed
            </mat-checkbox>

            <div *ngIf="loading$ | async" class="loading-container">
              <mat-spinner diameter="30"></mat-spinner>
            </div>

            <div class="error-message" *ngIf="error$ | async as error">
              {{ error }}
            </div>

            <div class="form-actions">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="todoForm.invalid || (loading$ | async)">
                <mat-icon>{{ isEditMode ? 'save' : 'add' }}</mat-icon>
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
              <button
                mat-button
                type="button"
                (click)="onCancel()"
                [disabled]="loading$ | async">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .todo-form-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .form-card {
      margin-top: 20px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .form-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
  `]
})
export class TodoFormComponent implements OnInit {
  todoForm: FormGroup;
  isEditMode = false;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
    this.todoForm = this.fb.group({
      todo: ['', [Validators.required, Validators.pattern(/\S+/)]],
      completed: [false]
    });
    this.loading$ = this.store.select(selectTodoLoading);
    this.error$ = this.store.select(selectTodoError);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.store.dispatch(loadTodo({ id: +id }));
      this.store.select(selectSelectedTodo).subscribe(todo => {
        if (todo) {
          this.todoForm.patchValue({
            todo: todo.todo,
            completed: todo.completed
          });
        }
      });
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
  onSubmit(): void {
    if (this.todoForm.valid) {
      const formValue = {
        ...this.todoForm.value,
        todo: this.todoForm.value.todo.trim()
      };
      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
          this.store.dispatch(updateTodo({
            id: +id,
            todo: {
              todo: formValue.todo,
              completed: formValue.completed
            }
          }));
        }
      } else {
        this.store.dispatch(createTodo({
          todo: {
            todo: formValue.todo,
            completed: formValue.completed
          }
        }));
      }
    }
  }
  onCancel(): void {
    this.router.navigate(['/todos']);
  }
}

