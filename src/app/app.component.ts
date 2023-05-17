import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/App.state';
import { loadProfile } from './state/login/login.action';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private store: Store<AppState>,
    private errorService: ErrorService
  ) {
    this.store.dispatch(loadProfile());
  }
}
