// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { map, Observable } from 'rxjs';
import { SingleUserApiResponse, UpdatedUserApiRequest, UpdatedUserApiResponse, UpdatedUserModel, User } from 'src/app/models/User.models';

@Injectable({
  providedIn: 'root'
})
export class UserEditorService {
  private apiUrl = environment.apiBaseUrl; 

  constructor(private http: HttpClient) {}

  updateUser$(id:number,updatedUser:UpdatedUserApiRequest): Observable<UpdatedUserModel> {
    return this.http.put<UpdatedUserApiResponse>(`${this.apiUrl}/users/${id}`,{updatedUser}).pipe(map(res=>res.updatedUser))
  }

  createUser$(updatedUser:UpdatedUserApiRequest): Observable<UpdatedUserModel> {
    return this.http.post<UpdatedUserApiResponse>(`${this.apiUrl}/users`,{updatedUser}).pipe(map(res=>res.updatedUser))
  }

}
