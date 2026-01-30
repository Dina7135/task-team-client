import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth';

export const LoginSuccess = createAction(
    '[Auth] Login Success',
    props<{ user: User, token: string }>()
);

export const LogOut = createAction(
    '[Auth] Logout'
);

export const Error = createAction(
    '[Auth] Error',
    props<{ message: string }>()
);

export const InitAuth = createAction(
    '[App] Init Auth'
);

export const RestoreTokenSuccess = createAction(
    '[Auth] Restore Token Success',
    props<{ token: string, user?: User }>()
);