import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/App.state';
import { loadGroups } from '../../../state/group/group.action';
import { AddGroupDialogComponent } from '../admin-groups/add-group-dialog/add-group-dialog.component';
import { selectAllGroups } from '../../../state/group/group.selectors';
import { map } from 'rxjs';
import { selectAllChannels } from '../../../state/channels/channel.selectors';
import { loadChannels } from '../../../state/channels/channel.action';
import { AddChannelDialogComponent } from './add-channel-dialog/add-channel-dialog.component';

@Component({
  selector: 'app-admin-channels',
  templateUrl: './admin-channels.component.html',
  styleUrls: ['./admin-channels.component.scss'],
})
export class AdminChannelsComponent {
  channels$ = this.store.select(selectAllChannels).pipe(
    map((channels) =>
      channels.map((channel) => ({
        name: channel.name,
        link: `${channel.id}`,
        icon: 'forum',
      }))
    )
  );
  constructor(private dialog: MatDialog, private store: Store<AppState>) {
    this.store.dispatch(loadChannels());
  }

  openDialog() {
    this.dialog.open(AddChannelDialogComponent);
  }
}
