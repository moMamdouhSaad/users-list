import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginSuccess, logout } from '../auth.actions';
import { UserCredentials } from 'src/app/models/UserCredentials.model';
import { environment } from 'src/environment/environment';
import { Router } from '@angular/router';
const localStorageTokenKey = 'token'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;

  constructor(private http: HttpClient, private store: Store,private router:Router) {}

  login(credentials: UserCredentials): Observable<{ token: string }> {
    const url = `${environment.apiBaseUrl}/login`;
    return this.http.post<{ token: string }>(url, credentials).pipe(
      tap((response) => {
        this.isLoggedIn = true;
        this.store.dispatch(loginSuccess());
        localStorage.setItem(localStorageTokenKey, response.token);
      })
    );
  }


  signUp(credentials: UserCredentials): Observable<{ token: string, id:number }> {
    const url = `${environment.apiBaseUrl}/register`;
    return this.http.post<{ token: string , id:number}>(url, credentials).pipe(
      tap((response) => {
        this.isLoggedIn = true;
        this.store.dispatch(loginSuccess());
        localStorage.setItem(localStorageTokenKey, response.token);
      })
    );
  }





  logout(): void {
    this.isLoggedIn = false;
    this.store.dispatch(logout());
    localStorage.removeItem(localStorageTokenKey);
    setTimeout(() => {
    this.router.navigate(['/login'])
      
    }, 100);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(localStorageTokenKey);

  }
}
