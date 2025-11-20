import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { login, loginSuccess, loginFailure, logout, checkAuth, setAuth } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            return loginSuccess({ response });
          }),
          catchError(error => of(loginFailure({ error: error.message || 'Login failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        this.router.navigate(['/todos']);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      })
    ),
    { dispatch: false }
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(checkAuth),
      map(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
          const user = JSON.parse(userStr);
          return setAuth({ user, token });
        }
        return logout();
      })
    )
  );

}

