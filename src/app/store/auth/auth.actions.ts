import { createAction, props } from '@ngrx/store';


const AUTH = 'AUTH';

export const login = createAction(
    `[Page ${AUTH}] Login`,
    props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
    `[Service ${AUTH}] Login Success`,
    props<{ token: string }>()
);

export const loginFailure = createAction(
    `[Service ${AUTH}] Login Failure`,
    props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
