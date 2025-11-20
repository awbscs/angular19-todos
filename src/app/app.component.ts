import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated, selectCurrentUser } from './auth/store/auth.selectors';
import { logout, checkAuth } from './auth/store/auth.actions';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>Angular 19 Todos</span>
      <span class="spacer"></span>
      <ng-container *ngIf="isAuthenticated$ | async">
        <span class="user-info">{{ (currentUser$ | async)?.username }}</span>
        <button mat-button (click)="onLogout()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </ng-container>
    </mat-toolbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    .user-info {
      margin-right: 16px;
      display: flex;
      align-items: center;
    }
    main {
      min-height: calc(100vh - 64px);
    }
  `]
})
export class AppComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {
    this.store.dispatch(checkAuth());
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}

