// user-list.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/User.models';
import * as UserListActions from './users-list.actions';

export interface UserListState {
  users: User[];
  totalPages:number;
  loading: boolean;
  error: any;
  deleteUserLoading: boolean
  deleteUserError: any


}

const initialState: UserListState = {
  users: [],
  totalPages:1,
  loading: false,
  error: null,
  deleteUserLoading: false,
  deleteUserError:null
};

export const userListReducer = createReducer(
  initialState,
  // User list
  on(UserListActions.loadUsers, state => ({ ...state, loading: true })),
  on(UserListActions.loadUsersSuccess, (state, { users, totalPages }) => ({ ...state, users,totalPages, loading: false, error: null })),
  on(UserListActions.loadUsersFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Delete user
  on(UserListActions.deleteUser, (state) => ({ ...state, deleteUserLoading: true, deleteUserError: null })),
  on(UserListActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    deleteUserLoading: false,
    deleteUserError:null,
    // users: state.users.filter(user => user.id !== userId),
  })),
  
  on(UserListActions.deleteUserFailure, (state, { error }) => ({ ...state, deletingUser: false, deleteUserError: error }))
);
