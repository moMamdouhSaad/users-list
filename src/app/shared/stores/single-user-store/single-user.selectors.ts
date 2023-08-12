import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SingleUserState } from './single-user.reducer';

export const selectSingleUserState = createFeatureSelector<SingleUserState>('singleUser');

export const selectSingleUser = createSelector(selectSingleUserState, state => state.user);
export const selectSingleUserLoading = createSelector(selectSingleUserState, state => state.loading);
export const selectSingleUserError = createSelector(selectSingleUserState, state => state.error);
