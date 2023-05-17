import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-channel-side-panel',
  templateUrl: './channel-side-panel.component.html',
  styleUrls: ['./channel-side-panel.component.scss'],
})
export class ChannelSidePanelComponent {
  @Input() title: string = 'Title';
  @Input() list: User[] = [];
}
