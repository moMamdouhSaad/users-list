// user-list.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserListState } from './users-list.reducer'; // Adjust the path

export const selectUserListState = createFeatureSelector<UserListState>('userList');

export const selectUserList = createSelector(
  selectUserListState,
  (state: UserListState) => state.users
);

export const selectTotalPages = createSelector(
  selectUserListState,
  (state: UserListState) => state.totalPages
);

export const selectUsersLoading = createSelector(
  selectUserListState,
  (state: UserListState) => state.loading
);

export const selectDeleteUserLoading = createSelector(
  selectUserListState,
  (state: UserListState) => state.deleteUserLoading
);

