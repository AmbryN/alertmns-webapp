import { Component, Input } from '@angular/core';
import { Channel } from '../../../../models/Channel';

@Component({
  selector: 'app-channel-badge',
  templateUrl: './channel-badge.component.html',
  styleUrls: ['./channel-badge.component.scss'],
})
export class ChannelBadgeComponent {
  @Input() channel: Channel = {
    id: 2,
    name: 'Test',
    visibility: 'PUBLIC',
    members: [],
    groups: [],
  };
}
