// update-user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserEditorActions from './user-editor.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {  UserEditorService } from '../services/update-user.service';

@Injectable()
export class UserEditorEffects {
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserEditorActions.updateUser),
      switchMap(action =>
        this.userService.updateUser$(action.id, {name:action.name,job:action.job}).pipe(
          map(resp => UserEditorActions.updateUserSuccess({ resp })),
          catchError(error => of(UserEditorActions.updateUserFailure({ error })))
        )
      )
    )
  );

  createUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserEditorActions.createUser),
    switchMap(action =>
      this.userService.createUser$({name:action.name,job:action.job}).pipe(
        map(resp => UserEditorActions.createUserSuccess({ resp })),
        catchError(error => of(UserEditorActions.createUserFailure({ error })))
      )
    )
  )
);

  constructor(private actions$: Actions, private userService: UserEditorService) {}
}
