import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/App.state';
import { loadProfile } from './state/login/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private store: Store<AppState>,
  ) {
    this.store.dispatch(loadProfile());
  }
}
