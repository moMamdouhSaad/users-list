// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { delay, map, Observable } from 'rxjs';
import { SingleUserApiResponse, User } from 'src/app/models/User.models';

@Injectable({
  providedIn: 'root'
})
export class SingleUserService {
  private apiUrl = environment.apiBaseUrl; // Adjust the API URL

  constructor(private http: HttpClient) {}

  getUser$(id:number): Observable<User> {
    return this.http.get<SingleUserApiResponse>(`${this.apiUrl}/users/${id}`).pipe(map(resp=>resp.data),delay(700));
  }
}
