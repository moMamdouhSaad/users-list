// single-user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SingleUserActions from './single-user.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SingleUserService } from '../../services/single-user.service';

@Injectable()
export class SingleUserEffects {
  loadSingleUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingleUserActions.loadSingleUser),
      switchMap(action =>
        this.singleUserService.getUser$(action.userId).pipe(
          map(user => SingleUserActions.loadSingleUserSuccess({ user })),
          catchError(error => of(SingleUserActions.loadSingleUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private singleUserService: SingleUserService) {}
}
