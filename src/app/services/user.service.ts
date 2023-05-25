import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.serverUrl + '/users');
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/users/' + userId);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(environment.serverUrl + '/users', user);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(environment.serverUrl + '/users/' + userId);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(environment.serverUrl + '/users', user);
  }

  handle(error: any): string {
    let message;
    if (error.status > 500) message = 'Erreur serveur';
    else if (error.status == 403)
      message = "L'authentification a expiré : veuillez vous reconnecter";
    else if (error.status > 400) message = error.error.error.message;
    else message = 'Erreur de connexion';
    return message;
  }
}
