import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppState } from '../../../../../../state/App.state';
import { Store } from '@ngrx/store';
import { Channel } from '../../../../../../models/Channel';

@Component({
  selector: 'app-rename-channel-dialog',
  templateUrl: './rename-channel-dialog.component.html',
  styleUrls: ['./rename-channel-dialog.component.scss'],
})
export class RenameChannelDialogComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(this.data.channel.id),
    visibility: new FormControl(this.data.channel.visibility),
    name: new FormControl(this.data.channel.name, [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { channel: Channel; dispatcher: Function },
    private store: Store<AppState>
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(this.data.dispatcher({ channel: this.form.value }));
    }
  }
}
