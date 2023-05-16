import { Component } from '@angular/core';
import { Channel } from '../../models/Channel';
import { map, Observable } from 'rxjs';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { LoginService } from '../../services/login.service';
import { selectCurrentUser } from '../../state/login/login.selectors';
import { User } from '../../models/User';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  channels$: Observable<Channel[]> = this.store.select(selectCurrentUser).pipe(
    map((user) => {
      if (user && user.channels) return user.channels;
      else return [];
    })
  );
  currentUser$: Observable<User | null> = this.store.select(selectCurrentUser);
  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map((user) => {
      if (user != null)
        return user!.roles!.find((role) => role == 'ROLE_ADMIN') != undefined;
      else return false;
    })
  );
  constructor(private store: Store<AppState>) {}
}
