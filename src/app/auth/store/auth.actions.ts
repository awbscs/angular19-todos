import { createAction, props } from '@ngrx/store';
import { User, LoginRequest, LoginResponse } from '../../core/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: LoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const checkAuth = createAction('[Auth] Check Auth');

export const setAuth = createAction(
  '[Auth] Set Auth',
  props<{ user: User; token: string }>()
);

