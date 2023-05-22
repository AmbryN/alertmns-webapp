import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/App.state';
import { selectAllUsers } from '../../../../state/users/user.selectors';
import { loadUsers } from '../../../../state/users/user.action';
import { User } from '../../../../models/User';
import { Column } from '../../../shared/data-table/data-table.component';
import { addUserToGroup } from '../../../../state/groups/group.action';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrls: ['./add-member-dialog.component.scss'],
})
export class AddMemberDialogComponent {
  users$ = this.store.select(selectAllUsers);
  selectedItems: User[] = [];
  columns: Column[] = [
    {
      header: 'E-mail',
      columnName: 'email',
      cell: (element: User) => `${element.email}`,
    },
    {
      header: 'Prénom',
      columnName: 'firstname',
      cell: (element: User) => `${element.firstname}`,
    },
    {
      header: 'Nom',
      columnName: 'lastname',
      cell: (element: User) => `${element.lastname}`,
    },
    {
      header: 'Actions',
      columnName: 'action',
      cell: () => '',
    },
  ];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: number,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadUsers());
  }

  updateSelectedItems(item: User) {
    this.selectedItems = [...this.selectedItems, item];
  }

  addUsers(selectedUsers: User[]) {
    this.store.dispatch(
      addUserToGroup({ groupId: this.data, users: selectedUsers })
    );
  }

  removeUser($event: number) {
    this.selectedItems = this.selectedItems.filter((user) => user.id != $event);
  }
}
