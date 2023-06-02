import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/App.state';
import { createChannel } from 'src/app/state/channels/channel.action';

@Component({
  selector: 'app-add-channel-dialog',
  templateUrl: './add-channel-dialog.component.html',
  styleUrls: ['./add-channel-dialog.component.scss']
})
export class AddChannelDialogComponent {
  form: FormGroup = new FormGroup({
    visibility: new FormControl('PUBLIC'),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  constructor(private store: Store<AppState>) {}

  onAdd() {
    if (this.form.valid)
      this.store.dispatch(createChannel({ channel: this.form.value }));
  }
}
