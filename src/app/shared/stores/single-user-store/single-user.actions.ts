// single-user.actions.ts
import { createAction, props } from '@ngrx/store';

export const loadSingleUser = createAction('[Single User] Load Single User', props<{ userId: number }>());
export const loadSingleUserSuccess = createAction('[Single User] Load Single User Success', props<{ user: any }>());
export const loadSingleUserFailure = createAction('[Single User] Load Single User Failure', props<{ error: any }>());
export const resetSingleUser = createAction('[Single User] Reset Single User');
