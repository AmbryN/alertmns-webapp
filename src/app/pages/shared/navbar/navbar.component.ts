import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { User } from '../../../models/User';
import { AppState } from '../../../state/App.state';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../state/login/login.selectors';
import { logout } from '../../../state/login/login.action';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public connectedUser: User | null = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe((user) => {
      this.connectedUser = user;
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
