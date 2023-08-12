// user-list.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserListActions from './../store/users-list.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserListService } from '../services/users-list.service';

@Injectable()
export class UserListEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserListActions.loadUsers),
      switchMap((props) =>
        this.usersListService.getUsers$(props.page,props.perPage).pipe(
          map(resp => {
            const { data, total_pages } = resp;
            return UserListActions.loadUsersSuccess({ users: data, totalPages: total_pages })}),
          catchError(error => of(UserListActions.loadUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserListActions.deleteUser),
    switchMap((action) =>
      this.usersListService.deleteUser$(action.userId).pipe(
        map(() => UserListActions.deleteUserSuccess({ userId: action.userId })),
        catchError(error => of(UserListActions.deleteUserFailure({ error })))
      )
    )
  )
);

  constructor(private actions$: Actions, private usersListService: UserListService) {}
}
