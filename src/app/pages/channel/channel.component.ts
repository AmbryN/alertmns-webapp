import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { sendMessage, loadMessages } from '../../state/messages/message.action';
import { selectAllMessages } from '../../state/messages/message.selectors';
import { AppState } from '../../state/App.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  public message: string = '';
  public messages$ = this.store.select(selectAllMessages);

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.store.dispatch(loadMessages({ channelId: params['id'] }));
    });
  }

  addMessage(): void {
    this.store.dispatch(
      sendMessage({ message: { id: 1, userId: 1, content: this.message } })
    );
    this.message = '';
  }
}
