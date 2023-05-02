import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AppError } from '../models/AppError';
import { TokenResponse } from '../models/TokenResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedInUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  loginError$ = new BehaviorSubject<AppError | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.wireUpUser();
  }
  login(user: User): void {
    this.http
      .post<TokenResponse>('http://localhost:8080/discord/api/login', user)
      .pipe(
        tap((tokenRes) => localStorage.setItem('jwt', tokenRes.token)),
        switchMap((_) =>
          this.http.get<User>('http://localhost:8080/discord/api/users/profile')
        )
      )
      .subscribe({
        next: (user) => {
          this.loggedInUser$.next(user);
          this.router.navigateByUrl('/home').then();
        },
        error: (err) => {
          let error: AppError = { isErr: true, message: '' };
          if (err.status >= 500) {
            error.message = 'Erreur serveur';
          } else if (err.status >= 400) {
            error.message = err.error.error.message;
          } else {
            error.message = 'Problème de connexion';
          }
          this.loginError$.next(error);
        },
      });
  }

  getLoggedInUser(): Observable<User | null> {
    return this.loggedInUser$;
  }

  isConnected(): Observable<boolean> {
    return this.loggedInUser$.pipe(map((user) => true));
  }

  getLoginError(): Observable<AppError | null> {
    return this.loginError$;
  }

  logout() {
    localStorage.clear();
    this.loggedInUser$.next(null);
    this.router.navigateByUrl('login').then();
  }

  resetLoginError(): void {
    this.loginError$.next(null);
  }

  wireUpUser(): void {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      this.http
        .get<User>('http://localhost:8080/discord/api/users/profile')
        .subscribe((user) => this.loggedInUser$.next(user));
    }
  }
}
