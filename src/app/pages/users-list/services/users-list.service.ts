// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { delay, Observable } from 'rxjs';
import { UsersListApiResponse } from 'src/app/models/User.models';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  private apiUrl = environment.apiBaseUrl; 

  constructor(private http: HttpClient) {}

  getUsers$(page: number, perPage: number):Observable<UsersListApiResponse> {
    const params = { page: page.toString(), per_page: perPage.toString() };
    return this.http.get<UsersListApiResponse>(`${this.apiUrl}/users`, { params }).pipe(delay(700));
  }
  deleteUser$(userId:number):Observable<null>{
    return this.http.delete<null>(`${this.apiUrl}/users/${userId}`).pipe(delay(700));
  }
}
