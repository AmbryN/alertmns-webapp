import { Component } from '@angular/core';
import { Channel } from '../../models/Channel';
import { map, Observable, tap } from 'rxjs';
import { AppState } from '../../state/App.state';
import { Store } from '@ngrx/store';
import { selectAllChannels } from '../../state/channels/channel.selectors';
import { LoginService } from '../../services/login.service';
import { loadChannels } from '../../state/channels/channel.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  // public channels$: Observable<Channel[]> =
  //   this.store.select(selectAllChannels);
  channels$: Observable<Channel[]> = this.loginService.getLoggedInUser().pipe(
    map((user) => {
      if (user && user.channels) return user.channels;
      else return [];
    })
  );
  isConnected$: Observable<boolean> = this.loginService.isConnected();
  result: boolean = false;

  ngOnInit() {
    // this.store.dispatch(loadChannels());
    this.isConnected$.subscribe((result) => (this.result = result));
  }
  constructor(
    private store: Store<AppState>,
    private loginService: LoginService
  ) {}
}
