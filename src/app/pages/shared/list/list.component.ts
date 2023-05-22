import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ListItem = {
  name: string;
  link: string;
  icon: string;
};
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() list: ListItem[] = [];
  @Input() color: 'neutral' | 'light' | undefined;
  selectedId: number | undefined;
  @Output() idChange: EventEmitter<number> = new EventEmitter<number>();

  getColor() {
    switch (this.color) {
      case 'light':
        return 'color-light';
      default:
        return 'color-neutral';
    }
  }

  select(id: number) {
    this.selectedId = id;
    this.idChange.emit(this.selectedId);
  }
}
