// update-user.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userEditorState } from './user-editor.reducer';

export const selectUpdateUserState = createFeatureSelector<userEditorState>('userEditor');

export const selectUpdateUser = createSelector(selectUpdateUserState, state => state.user);
export const selectUpdateUserUpdating = createSelector(selectUpdateUserState, state => state.updating);
export const selectUpdateUserError = createSelector(selectUpdateUserState, state => state.error);
export const selectUpdateUserSuccess = createSelector(selectUpdateUserState, state => state.success);
export const selectLoading = createSelector(selectUpdateUserState, state => state.loading);

