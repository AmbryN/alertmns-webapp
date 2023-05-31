import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { AppState } from '../../../state/App.state';
import { Store } from '@ngrx/store';
import {
  selectAllUsers,
  userStatus,
} from '../../../state/users/user.selectors';
import { deleteUser, loadUsers } from '../../../state/users/user.action';
import { Column } from '../../shared/data-table/data-table.component';
import { User } from '../../../models/User';
import { UpdateUserDialogComponent } from './update-user-dialog/update-user-dialog.component';
import { filter, map, takeLast } from 'rxjs';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent {
  users$ = this.store.select(selectAllUsers);
  userLoadingStatus$ = this.store.select(userStatus);

  columns: Column[] = [
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
      header: 'E-mail',
      columnName: 'email',
      cell: (element: User) => `${element.email}`,
    },
    {
      header: 'Actions',
      columnName: 'action',
      cell: () => ``,
    },
  ];

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadUsers());
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent);
  }

  onUpdate(userId: number): void {
    const sub = this.users$.subscribe((users) => {
      let user = users.find((user) => user.id == userId);
      this.dialog.open(UpdateUserDialogComponent, { data: user });
    });
    sub.unsubscribe();
  }

  onDelete(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
}