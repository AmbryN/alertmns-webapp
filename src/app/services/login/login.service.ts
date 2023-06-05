import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/User';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { TokenResponse } from '../../models/TokenResponse';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { loadProfile } from '../../state/login/login.action';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>
  ) {}
  login(user: User): Observable<TokenResponse> {
    localStorage.clear();
    return this.http.post<TokenResponse>(
      environment.serverUrl + '/login',
      user
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/users/profile');
  }

  logout(): Observable<any> {
    localStorage.clear();
    return of();
  }

  wireUpUser(): void {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.store.dispatch(loadProfile());
    }
  }

  handleError(error: any): string {
    let message: string;
    if (error.status >= 500) {
      message = 'Erreur serveur';
    } else if (error.status == 403) {
      message = "L'authentification a expiré : veuillez vous reconnecter";
    } else if (error.status >= 400) {
      message = error.error.error.message;
    } else {
      message = 'Problème de connexion';
    }
    return message;
  }
}
