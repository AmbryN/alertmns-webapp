import { Component } from "@angular/core";
import { selectedChannel } from "../../../../../state/channels/channel.selectors";
import { map, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../../state/App.state";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { AddMemberDialogComponent } from "../../../../shared/add-member-dialog/add-member-dialog.component";
import { User } from "../../../../../models/User";
import {
  addGroupsToChannel,
  addUsersToChannel,
  loadChannel,
  removeGroupFromChannel,
  removeUserFromChannel,
} from "../../../../../state/channels/channel.action";
import { Group } from "../../../../../models/Group";
import { AddGroupToChannelDialogComponent } from "../../add-group-to-channel-dialog/add-group-to-channel-dialog.component";
import { RenameChannelDialogComponent } from "./rename-channel-dialog/rename-channel-dialog.component";
import { Channel } from "../../../../../models/Channel";

@Component({
  selector: "app-channel-view",
  templateUrl: "./channel-view.component.html",
  styleUrls: ["./channel-view.component.scss"],
})
export class ChannelViewComponent {
  channelId = 0;
  selectedChannel$ = this.store.select(selectedChannel);
  members$ = this.selectedChannel$.pipe(map((channel) => channel.members));
  groups$ = this.selectedChannel$.pipe(map((channel) => channel.groups));

  sub: Subscription;
  selectedChannel: Channel | null = null;

  columns = [
    {
      header: "Prénom",
      columnName: "firstname",
      cell: (element: User) => `${element.firstname}`,
    },
    {
      header: "Nom",
      columnName: "lastname",
      cell: (element: User) => `${element.lastname}`,
    },
    {
      header: "E-mail",
      columnName: "email",
      cell: (element: User) => `${element.email}`,
    },
    {
      header: "Actions",
      columnName: "action",
      cell: () => ``,
    },
  ];

  columns_group = [
    {
      header: "Id",
      columnName: "id",
      cell: (element: Group) => `${element.id}`,
    },
    {
      header: "Nom",
      columnName: "name",
      cell: (element: Group) => `${element.name}`,
    },
    {
      header: "Actions",
      columnName: "action",
      cell: () => ``,
    },
  ];

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.route.paramMap.subscribe((params) => {
      this.channelId = Number(params.get("id"));
      this.store.dispatch(loadChannel({ channelId: this.channelId }));
    });

    this.sub = this.selectedChannel$.subscribe((channel) => {
      this.selectedChannel = channel;
    });
  }

  onDeleteMember(userId: number): void {
    this.store.dispatch(
      removeUserFromChannel({ channelId: this.channelId, userId })
    );
  }

  onDeleteGroup(groupId: number): void {
    this.store.dispatch(
      removeGroupFromChannel({ channelId: this.channelId, groupId })
    );
  }

  openMembersDialog(): void {
    this.dialog.open(AddMemberDialogComponent, {
      data: { containerId: this.channelId, dispatcher: addUsersToChannel },
    });
  }

  openGroupsDialog(): void {
    this.dialog.open(AddGroupToChannelDialogComponent, {
      data: { containerId: this.channelId, dispatcher: addGroupsToChannel },
    });
  }

  openRenameDialog(): void {
    this.dialog.open(RenameChannelDialogComponent, {
      data: { channel: this.selectedChannel! },
    });
  }
}
