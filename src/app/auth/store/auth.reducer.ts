import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { response }): AuthState => ({
    ...state,
    user: response.user,
    token: response.token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null
  })),
  on(AuthActions.logout, (): AuthState => ({
    ...initialAuthState
  })),
  on(AuthActions.setAuth, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true
  }))
);

