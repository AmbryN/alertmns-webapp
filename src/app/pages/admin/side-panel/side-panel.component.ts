import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  @Input() title: string = 'Title';
  @Input() list: { name: string; link: string; icon: string }[] = [];
}
