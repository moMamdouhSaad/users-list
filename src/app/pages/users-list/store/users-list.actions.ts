import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/User.models';

// User list actions
export const loadUsers = createAction('[User List] Load Users', props<{ page: number; perPage: number }>());
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: User[]; totalPages: number }>()
); export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: any }>());


// delete user actions
export const deleteUser = createAction('[User List] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User List] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[User List] Delete User Failure', props<{ error: any }>());