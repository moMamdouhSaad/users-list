import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from './services/auth.service';
import { login, loginSuccess, loginFailure, signUp, signUpSuccess } from './auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            switchMap((action) =>
                this.authService.login(action.credentials).pipe(
                    map(() => {
                        this.router.navigate(['/users-list']); 
                        return loginSuccess()
                    }),
                    catchError((errorResponse: { error: { error: string } }) => {
                        const errorMessage = errorResponse.error.error; 
                        return of(loginFailure({ error: errorMessage }));
                    })
                )
            )
        )
    );


    signUp$ = createEffect(() =>
    this.actions$.pipe(
        ofType(signUp),
        switchMap((action) =>
            this.authService.signUp(action.credentials).pipe(
                map(() => {
                    this.router.navigate(['/users-list']); // Redirect to dashboard
                    return signUpSuccess()
                }),
                catchError((errorResponse: { error: { error: string } }) => {
                    const errorMessage = errorResponse.error.error; // Extract the error message
                    return of(loginFailure({ error: errorMessage }));
                })
            )
        )
    )
);
    


  

  constructor(private actions$: Actions, private authService: AuthService,private router:Router) {}
}
