import { createReducer, on } from '@ngrx/store';
import * as SingleUserActions from './single-user.actions';

export interface SingleUserState {
  user: any;
  loading: boolean;
  error: any;
}

export const initialState: SingleUserState = {
  user: null,
  loading: false,
  error: null
};

export const singleUserReducer = createReducer(
  initialState,
  on(SingleUserActions.loadSingleUser, state => ({ ...state, loading: true, error: null })),
  on(SingleUserActions.loadSingleUserSuccess, (state, { user }) => ({ ...state, loading: false, user })),
  on(SingleUserActions.loadSingleUserFailure, (state, { error }) => {
    return { ...state, loading: false, error}}),
  on(SingleUserActions.resetSingleUser, () => initialState) 

);

export function reducer(state: SingleUserState | undefined, action: any) {
  return singleUserReducer(state, action);
}
