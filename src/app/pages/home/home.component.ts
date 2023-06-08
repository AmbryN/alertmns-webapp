import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/App.state';
import { loadNotifications } from 'src/app/state/notifications/notification.action';
import { selectAllNotifications } from 'src/app/state/notifications/notification.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  notifications$ = this.store.select(selectAllNotifications);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadNotifications());
  }
}
