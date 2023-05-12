import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  @Input() title: string = 'Title';
  @Input() list: User[] = [];
}
