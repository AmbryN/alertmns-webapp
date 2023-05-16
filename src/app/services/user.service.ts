import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { baseUrl } from './baseUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + '/users');
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(baseUrl + '/users/' + userId);
  }
}
