import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.store';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  
  on(AuthActions.LoginSuccess, (state, { user, token }) => ({
    ...state,
    isLoggedIn: true,
    user: user,
    token: token,
    error: null
  })),

  on(AuthActions.RestoreTokenSuccess, (state, { token, user }) => ({
    ...state,
    isLoggedIn: true,
    user: user || null,
    token: token,
    error: null
  })),

  on(AuthActions.LogOut, (state) => ({
    ...initialAuthState
  })),

  on(AuthActions.Error, (state, { message }) => ({
    ...state,
    error: message
  }))
);
