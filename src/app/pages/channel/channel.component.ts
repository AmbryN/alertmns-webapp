import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadMessages, sendMessage } from '../../state/messages/message.action';
import { selectAllMessages } from '../../state/messages/message.selectors';
import { AppState } from '../../state/App.state';
import { ActivatedRoute } from '@angular/router';
import { loadChannel } from '../../state/channels/channel.action';
import { selectedChannel } from '../../state/channels/channel.selectors';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  @ViewChild('messages_id') container!: ElementRef;
  message: string = '';
  messages$ = this.store.select(selectAllMessages);
  private channelId: number | undefined;
  selectedChannel$ = this.store.select(selectedChannel);

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
      if (this.channelId) {
        this.store.dispatch(loadChannel({ channelId: this.channelId }));
        this.store.dispatch(loadMessages({ channelId: this.channelId }));
        this.messageService.getMessages(this.channelId);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.scrollDown(), 200);
  }

  scrollDown(): void {
    this.container.nativeElement.scrollTo(0, 20000);
  }

  addMessage(): void {
    this.store.dispatch(
      sendMessage({
        channelId: this.channelId!,
        message: { id: 1, userId: 1, content: this.message },
      })
    );
    this.message = '';
    setTimeout(() => this.scrollDown(), 200);
  }
}
