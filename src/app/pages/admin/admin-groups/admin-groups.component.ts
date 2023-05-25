import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/App.state';
import { loadGroups } from '../../../state/group/group.action';
import { selectAllGroups } from '../../../state/group/group.selectors';
import { map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';

@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.scss'],
})
export class AdminGroupsComponent {
  groups$ = this.store.select(selectAllGroups).pipe(
    map((groups) =>
      groups.map((group) => ({
        name: group.name,
        link: `${group.id}`,
        icon: 'groups',
      }))
    )
  );

  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadGroups());
  }

  openDialog() {
    console.log('CLICKED');
    this.dialog.open(AddGroupDialogComponent);
  }
}
