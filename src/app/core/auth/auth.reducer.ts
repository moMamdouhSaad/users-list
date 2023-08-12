import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout, signUpSuccess, signUpFailure, resetAuth, login, signUp } from './auth.actions';

export interface AuthState {
    isLoggedIn: boolean;
    error: string | null; 
    loading:boolean
  }
  
  export const initialAuthState: AuthState = {
    isLoggedIn: false,
    error: null, 
    loading:false
  };
  

  
export const authReducer = createReducer(
    initialAuthState,
    on(login, (state) => ({ ...state, loading: true, error: null })),
    on(loginSuccess, (state) => ({ ...state, isLoggedIn: true, error: null ,loading: false})),
    on(loginFailure, (state, { error }) => ({ ...state, isLoggedIn: false, error: error || 'Unknown error' ,loading: false})),
    on(signUp, (state) => ({ ...state, loading: true, error: null })),
    on(signUpSuccess, (state) => ({ ...state, isLoggedIn: true, error: null,loading: false })),
    on(signUpFailure, (state, { error }) => ({ ...state, isLoggedIn: false, loading: false,error: error || 'Unknown error' })),
    on(logout, (state) => ({ ...state, isLoggedIn: false, error: null ,loading: false})),
    on(resetAuth, (state) => initialAuthState),

);







