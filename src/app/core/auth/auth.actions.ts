import { createAction, props } from '@ngrx/store';
import { UserCredentials } from 'src/app/models/UserCredentials.model';

export const login = createAction('[Auth] Login', props<{ credentials: UserCredentials }>());
export const loginSuccess = createAction('[Auth] Login Success');
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());



export const signUp = createAction('[Auth] Signup', props<{ credentials: UserCredentials }>());
export const signUpSuccess = createAction('[Auth] Signup Success');
export const signUpFailure = createAction('[Auth] Signup Failure', props<{ error: string }>());


export const logout = createAction('[Auth] Logout');
export const resetAuth = createAction('[Auth] Reset Auth ');
