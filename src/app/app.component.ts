import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
    private loginService: LoginService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadProfile());
  }
}
