import { Component } from '@angular/core';
import { AppState } from '../../../../state/App.state';
import { Store } from '@ngrx/store';
import {
  loadGroup,
  removeUserFromGroup,
} from '../../../../state/group/group.action';
import { ActivatedRoute } from '@angular/router';
import { selectedGroup } from '../../../../state/group/group.selectors';
import { map } from 'rxjs';
import { User } from '../../../../models/User';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from '../add-member-dialog/add-member-dialog.component';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent {
  groupId: number = 0;
  selectedGroup$ = this.store.select(selectedGroup);
  members$ = this.selectedGroup$.pipe(map((group) => group.members));

  columns = [
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

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params) => {
      this.groupId = Number(params.get('id'));
      this.store.dispatch(loadGroup({ groupId: this.groupId }));
    });
  }

  onDelete(userId: number): void {
    this.store.dispatch(removeUserFromGroup({ groupId: this.groupId, userId }));
  }

  openDialog(): void {
    this.dialog.open(AddMemberDialogComponent, { data: this.groupId });
  }
}
