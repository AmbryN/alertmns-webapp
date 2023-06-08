import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItem } from '../list/list.component';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  @Input() title = 'Title';
  @Input() list: ListItem[] = [];
  @Input() color: 'light' | 'lightest' | undefined;
  @Input() hasAddButton = false;
  @Input() buttonText = 'Ajouter';

  @Output() buttonClicked: EventEmitter<MouseEvent> =
    new EventEmitter<MouseEvent>();

  getColor() {
    switch (this.color) {
      case 'lightest':
        return 'color-lightest';
      default:
        return 'color-light';
    }
  }

  getListColor() {
    switch (this.color) {
      case 'lightest':
        return 'light';
      default:
        return 'neutral';
    }
  }

  onClick() {
    this.buttonClicked.emit();
  }
}
