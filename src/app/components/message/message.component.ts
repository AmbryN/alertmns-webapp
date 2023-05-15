import { Component, Input } from '@angular/core';
import { IncomingMessage } from '../../models/IncomingMessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
  @Input() message: IncomingMessage = {
    sender: { email: '' },
    content: 'Contenu',
    channelId: 0,
  };
}
