import { Component } from '@angular/core';
import { selectedChannel } from '../../../../../state/channels/channel.selectors';
import { selectedGroup } from '../../../../../state/group/group.selectors';
import { map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../state/App.state';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  loadGroup,
  removeUserFromGroup,
} from '../../../../../state/group/group.action';
import { AddMemberDialogComponent } from '../../../../shared/add-member-dialog/add-member-dialog.component';
import { User } from '../../../../../models/User';
import { addGroupsToChannel, addUsersToChannel, loadChannel, removeGroupFromChannel, removeUserFromChannel } from '../../../../../state/channels/channel.action';
import { Group } from '../../../../../models/Group';
import { AddGroupToChannelDialogComponent } from '../../add-group-to-channel-dialog/add-group-to-channel-dialog.component';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.scss'],
})
export class ChannelViewComponent {
  channelId: number = 0;
  selectedChannel$ = this.store.select(selectedChannel);
  members$ = this.selectedChannel$.pipe(map((channel) => channel.members));
  groups$ = this.selectedChannel$.pipe(map((channel) => channel.groups));

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

  columns_group = [
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
      cell: () => ``,
    },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params) => {
      this.channelId = Number(params.get('id'));
      this.store.dispatch(loadChannel({ channelId: this.channelId }));
    });
  }

  onDeleteMember(userId: number): void {
    this.store.dispatch(
      removeUserFromChannel({ channelId: this.channelId, userId })
    );
  }

  onDeleteGroup(groupId: number): void {
    this.store.dispatch(removeGroupFromChannel({ channelId: this.channelId, groupId }));
  }

  openMembersDialog(): void {
    this.dialog.open(AddMemberDialogComponent, { data: {containerId: this.channelId, dispatcher: addUsersToChannel} });
  }

  openGroupsDialog(): void {
    this.dialog.open(AddGroupToChannelDialogComponent, { data: {containerId: this.channelId, dispatcher: addGroupsToChannel} });
  }
}
