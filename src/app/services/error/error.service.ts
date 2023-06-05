import { Injectable } from '@angular/core';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { loginError } from '../../state/login/login.selectors';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, merge, tap } from 'rxjs';
import { userError } from '../../state/users/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  durationInSeconds = 5;

  errors$ = merge(
    this.store.select(loginError),
    this.store.select(userError) // TODO: add other errors
  ).pipe(
    filter((error) => error != ''),
    tap((error) => this.openSnackBar(error))
  );

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.errors$.subscribe();
  }

  openSnackBar(error: string) {
    this.snackBar.open(error, undefined, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
