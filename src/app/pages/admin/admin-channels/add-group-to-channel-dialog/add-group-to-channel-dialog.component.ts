import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Group } from 'src/app/models/Group';
import { Column } from 'src/app/pages/shared/data-table/data-table.component';
import { AppState } from 'src/app/state/App.state';
import { loadGroups } from 'src/app/state/group/group.action';
import { selectAllGroups } from 'src/app/state/group/group.selectors';

@Component({
  selector: 'app-add-group-to-channel-dialog',
  templateUrl: './add-group-to-channel-dialog.component.html',
  styleUrls: ['./add-group-to-channel-dialog.component.scss']
})
export class AddGroupToChannelDialogComponent {
  groups$ = this.store.select(selectAllGroups);
  selectedItems: Group[] = [];
  columns: Column[] = [
    {
      header: 'Id',
      columnName: 'id',
      cell: (element: Group) => `${element.id}`,
    },
    {
      header: 'Nom',
      columnName: 'name',
      cell: (element: Group) => `${element.name}`,
    },
    {
      header: 'Actions',
      columnName: 'action',
      cell: () => '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {containerId: number, dispatcher: Function},
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadGroups());
  }

  updateSelectedItems(item: Group) {
    this.selectedItems = [...this.selectedItems, item];
  }

  addGroups(selectedItems: Group[]) {
    this.store.dispatch(
      this.data.dispatcher({ channelId: this.data.containerId, groupId: this.data.containerId, users: selectedItems, groups: selectedItems })
    );
  }

  removeGroup($event: number) {
    this.selectedItems = this.selectedItems.filter((group) => group.id != $event);
  }
}
