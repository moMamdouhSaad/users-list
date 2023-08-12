// update-user.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as UserEditorActions from './user-editor.actions';
import { UpdatedUserModel } from 'src/app/models/User.models'

export interface userEditorState {
  user: UpdatedUserModel | null;
  updating: boolean;
  creating: boolean; // Add property for creating user
  success: boolean; 
  error: any;
  loading:boolean;
}

export const initialState: userEditorState = {
  user: null,
  updating: false,
  creating: false, // Initialize as false
  success: false,
  error: null,
  loading:false
};

export const userEditorReducer = createReducer(
  initialState,
  on(UserEditorActions.updateUser, state => ({ ...state, updating: true, success: false, error: null, loading:true })),
  on(UserEditorActions.updateUserSuccess, (state, { resp })=>{
    return { ...state, updating: false, success: true ,loading: false}}),
  on(UserEditorActions.updateUserFailure, (state, { error }) => ({ ...state, updating: false, success: false, loading: false, error })),

  on(UserEditorActions.createUser, state => ({ ...state, creating: true, success: false, error: null,loading:true })),
  on(UserEditorActions.createUserSuccess, (state, { resp }) => ({ ...state, creating: false, success: true, loading:false })),
  on(UserEditorActions.createUserFailure, (state, { error }) => ({ ...state, creating: false, success: false, error,loading: false })),
);

export function reducer(state: userEditorState | undefined, action: any) {
  return userEditorReducer(state, action);
}
