import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-side-panel',
  templateUrl: './admin-side-panel.component.html',
  styleUrls: ['./admin-side-panel.component.scss'],
})
export class AdminSidePanelComponent {
  @Input() title: string = 'Title';
  @Input() list: { name: string; link: string }[] = [];
}
