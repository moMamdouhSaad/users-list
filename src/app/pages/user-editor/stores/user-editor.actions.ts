// update-user.actions.ts
import { createAction, props } from '@ngrx/store';
import { UpdatedUserApiResponse, UpdatedUserModel } from 'src/app/models/User.models';

export const updateUser = createAction('[Update User] Update User', props<{ id:number, name: string, job: string }>());
export const updateUserSuccess = createAction('[Update User] Update User Success', props<{ resp: UpdatedUserModel }>());
export const updateUserFailure = createAction('[Update User] Update User Failure', props<{ error: any }>());





export const createUser = createAction('[User Editor] Create User', props<{ name: string, job: string }>());
export const createUserSuccess = createAction('[User Editor] Create User Success', props<{ resp: UpdatedUserModel }>());
export const createUserFailure = createAction('[User Editor] Create User Failure', props<{ error: any }>());