import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  initAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.InitAuth),
        tap(() => {
          const token = this.authService.getToken();
          if (token) {
          }
        })
      ),
    { dispatch: false }
  );

  restoreToken$ = createEffect(
    () => {
      const token = this.authService.getToken();
      if (token) {
      }
      return this.actions$.pipe(
        ofType(AuthActions.InitAuth),
        tap(() => {
        })
      );
    },
    { dispatch: false }
  );
}
