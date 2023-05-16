import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { AppState } from '../../../state/App.state';
import { Store } from '@ngrx/store';
import {
  selectAllUsers,
  userLoadingStatus,
} from '../../../state/users/user.selectors';
import { deleteUser, loadUsers } from '../../../state/users/user.action';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss'],
})
export class AdminUsersComponent {
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'action'];
  users$ = this.store.select(selectAllUsers);
  userLoadingStatus$ = this.store.select(userLoadingStatus);

  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadUsers());
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  onDelete(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
}
